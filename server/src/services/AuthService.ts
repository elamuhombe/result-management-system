// src/services/AuthService.ts
import { IUser } from "../types/types";
import AuthRepository from "./repositories/AuthRepository";

class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  // Method to register a new user
  async registerUser(userData: Partial<IUser>): Promise<IUser | null> {
    const existingUser = await this.authRepository.findUserByUsername(
      userData.username || ""
    );
    if (existingUser) {
      throw new Error("User already exists");
    }

    return await this.authRepository.createUser(userData);
  }

  // Method to find user by username
  async getUserByUsername(username: string): Promise<IUser | null> {
    return await this.authRepository.findUserByUsername(username);
  }
}

export default AuthService;
