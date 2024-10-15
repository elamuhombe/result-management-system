// src/controllers/AuthController.ts
import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { IUser } from "../types/types"; // Assuming you have this type

class AuthController {
  private authService = new AuthService();

  // Controller to handle user registration
  public async registerUser(req: Request, res: Response): Promise<Response> {
    try {
      const userData: IUser = req.body;  // Extract user data from request body
      const newUser = await this.authService.registerUser(userData);
      return res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Registration failed" });
    }
  }

  
}

export default new AuthController();
