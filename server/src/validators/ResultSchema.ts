//src/validators/ResultSchema.ts
import { z } from 'zod';

// Define the validation schema for the IResult interface
export const resultSchema = z.object({
  resultId: z.string().nonempty("Result ID is required"),
  studentId: z.string().nonempty("Student ID is required"),
  attendanceMarks: z.number().optional().nullable(),
  projectReviewMarks: z.number().optional().nullable(),
  assessmentMarks: z.number().optional().nullable(),
  projectSubmissionMarks: z.number().optional().nullable(),
  linkedinPostMarks: z.number().optional().nullable(),
  totalMarks: z.number().optional().nullable(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
});