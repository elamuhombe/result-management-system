//src/validators/UserSchema.ts
import { z } from 'zod';

export const UserSchema = z.object({
  userId: z.string().uuid(), // Validate userId as a UUID
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters long" }) // Minimum length
    .max(30, { message: "Username cannot exceed 30 characters" }) // Maximum length
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username must contain only letters, numbers, and underscores" }), // Regex for valid characters
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) // At least one lowercase letter
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) // At least one uppercase letter
    .regex(/[0-9]/, { message: "Password must contain at least one number" }) // At least one number
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }), // At least one special character
  role: z.enum(["Admin", "Student"]), // Validate role as one of the specified strings
  createdAt: z.date().optional(), // Optional date field
  updatedAt: z.date().optional(), // Optional date field
});

