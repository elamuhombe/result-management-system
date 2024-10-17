// src/controllers/AuthController.ts
import { Request, Response } from "express";
import {AuthService} from "../services/index";
import { IUser } from "../types/types";

class AuthController {
  private authService = new AuthService();

  // Controller to handle user registration
  public async registerUser(req: Request, res: Response): Promise<Response> {
    try {
      const userData: IUser = req.body; // Extract user data from request body
      const newUser = await this.authService.registerUser(userData);
      return res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Registration failed" });
    }
  }
  // Controller to handle user login
  public async loginUser(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password, role } = req.body;
      const { user, token } = await this.authService.loginUser(username);

      // response
      return res.status(201).json({
        message: "Login successful",
        user: {
          username: user.username,
          role: user.role,
        },
        token,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Login failed" });
    }
  }
}

export default new AuthController();
