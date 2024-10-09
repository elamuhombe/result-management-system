//src/validators/StudentSchema.ts
import { z } from "zod";

// Define the validation schema for the IStudent interface
export const studentSchema = z.object({
  studentId: z.string().nonempty("Student ID is required"),
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().email("Invalid email address"), // Validates email format
  results: z.array(z.string()).optional(), // Optional array of result IDs
});
