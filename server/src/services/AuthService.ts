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

 // Method to login a user
async loginUser(userData: IUser): Promise<{ user: IUser, token: string }> {
  const loginResult = await this.authRepository.loginUser(userData.username, userData.password);
  
  if (!loginResult) {
      throw new Error("Invalid username or password");
  }

  // If you want to check the role after successful login
  const { user, token } = loginResult;

  // Optional: Validate role if needed
  if (user.role !== userData.role) {
      throw new Error("Unauthorized: Role mismatch");
  }

  return { user, token }; // Return both user and token
}

}

export default AuthService;
