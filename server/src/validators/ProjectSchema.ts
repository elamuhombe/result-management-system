//src/validators/ProjectsSchema.ts
import { z } from 'zod';
import mongoose from 'mongoose';

// Define the validation schema for the IProject interface
export const projectSchema = z.object({
    uniqueStudentId: z.string().nonempty("Unique Student Id is required"),
    project_title: z.string().nonempty("Project title is required"), // Required string for the project title
    submission_date: z.date(), // Required date for submission
    project_review_score: z.number().nonnegative("Review score must be a non-negative number"), // Required number for marks received for project review
    project_submission_score: z.number().nonnegative("Submission score must be a non-negative number"), // Required number for marks received for project submission
    maximum_score: z.number().nonnegative("Maximum score must be a non-negative number") // Required number for the maximum score
});
