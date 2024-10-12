//src/services/AuthService.ts
import { JsonWebTokenError } from "jsonwebtoken";
import { UserModel } from "../models";
import { IUser } from "../types/types";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserSchema } from "../validators/UserSchema";

class AuthService {
  //register a new user
  async registerUser(userData: IUser): Promise<IUser> {
      // Validate request body
      const validatedData = UserSchema.parse(userData)

    const { username, password, role } = validatedData;

    // check if user already exists
    const existingUser = await UserModel.findOne({ username });

    // throw an error if user already exists
    if (existingUser) {
      throw new Error("username already exists");
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      role,
    });

    return await newUser.save();
  }
  // login an existing user
  async login(
    username: string,
    password: string
  ): Promise<{ user: Partial<IUser>; token: string }> {
    //find the user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new Error("inavlid username");
    }
    // compare the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("invalid password");
    }

    // Generate a JWT token
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET || "your_jwt_secret",
      {
        expiresIn: "1h", // Token expiration time
      }
    );

    // return only essential user information
    return { user: { username: user.username, role: user.role }, token };
  }
}
