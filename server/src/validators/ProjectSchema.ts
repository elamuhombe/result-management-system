//src/validators/ProjectSchema.ts
import {z} from 'zod'
// Define the validation schema for the IProject interface
export const projectSchema = z.object({
    projectId: z.string().nonempty("Project ID is required"), // Required string for the ObjectId
    studentId: z.string().nonempty("Student ID is required"), // Required string for the ObjectId reference to Student
    project_title: z.string().nonempty("Project title is required"), // Required string for the project title
    submission_date: z.date(), // Required date for submission
    marks_received: z.number().nonnegative("Marks received must be a non-negative number"), // Required non-negative number for marks received
  });