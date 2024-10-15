// src/validators/AssessmentSchema.ts

import { z } from "zod";

// Define the validation schema for assessment marks
export const AssessmentSchema = z.object({
    uniqueStudentId: z.string().min(1, "Unique Student ID is required."),
    assessment_title: z.string().min(1, "Assessment title is required."),
    assessment_score: z.number().min(0, "Assessment score must be at least 0."),
    maximumScore: z.number().min(1, "Maximum score must be at least 1."),
    submission_date: z.date().refine(date => !isNaN(date.getTime()), {
        message: "Invalid submission date",
    }),
}).refine(data => data.assessment_score <= data.maximumScore, {
    message: "Assessment score cannot exceed the maximum score.",
    path: ["assessment_score"], // Path to the field being validated
});

// Type inference from the schema
export type IAssessmentMark = z.infer<typeof AssessmentSchema>;
