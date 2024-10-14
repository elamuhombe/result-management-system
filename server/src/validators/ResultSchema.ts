// src/validators/ResultSchema.ts
import { z } from 'zod';

// Define the validation schema for the IResult interface
export const resultSchema = z.object({
  uniqueStudentId: z.string().nonempty("Student ID is required"), // Required string for Student ID
  attendance_score: z.number().nullable(), // Attendance score
  project_review_score: z.number().nullable(), // Project review score
  assessment_score: z.number().nullable(), // Assessment score
  project_submission_score: z.number().nullable(), // Project submission score
  linkedin_score: z.number().nullable(), // LinkedIn post score
  createdAt: z.date().nullable(), // Date for creation
  updatedAt: z.date().nullable(), // Date for update
});

