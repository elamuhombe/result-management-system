//src/services/AuthService.ts
import { UserModel } from "../models";
import { IUser } from "../types/types";
import * as bcrypt from "bcrypt";

class AuthService {
  //register a new user
  async registerUser(userData: Omit<IUser, "userId">): Promise<IUser> {
    const { username, password, role } = userData;

    // check if user already exists
    const existingUser = await UserModel.findOne({ username });

    // throw an error if user already exists
    if (existingUser) {
      throw new Error("username already exists");
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
      role,
    });

    return newUser;

  
  }
    // login an existing user

    // compare the password

    // generate a jwt token
}
