// src/routes/AuthRoute.ts
import { Request, Response } from "express";
import { Router } from "express";
import AuthController from "../controllers/AuthController";

// Create an instance of Router to define authentication routes
const authRoute = Router();
// Create an instance of AuthController to handle authentication logic
const authController = new AuthController();

// Route to register a new user
authRoute.post('/register', async (req: Request, res: Response) => {
    // Call the registerUser method from AuthController and passing the request and response objects
    await authController.registerUser(req, res);
});

// Route to log in an existing user
authRoute.get('/login', async (req: Request, res: Response) => {
    // Calling the loginUser method from AuthController and passing the request and response objects
    await authController.loginUser(req, res);
});

// Export the authRoute to be used in the main application
export default authRoute;
