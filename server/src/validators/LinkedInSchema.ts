//src/validators/LinkedInSchema.ts
import { z } from 'zod';
import mongoose from 'mongoose';

// Define the validation schema for the ILinkedInPostMark interface
export const linkedInSchema = z.object({
    uniqueStudentId: z.custom<mongoose.Types.ObjectId>((value) => {
        return mongoose.Types.ObjectId.isValid(value);
    }, "Invalid Student ID"), // Required ObjectId reference to Student
    postId: z.string().nonempty("Post ID is required"), // Required string for the LinkedIn post ID
    linkedin_score: z.number().min(0, "LinkedIn score must be at least 0").max(100, "LinkedIn score must be at most 100"), // Score must be between 0 and 100
    engagementMetrics: z.object({
        likes: z.number().nonnegative("Likes must be a non-negative number"), // Required non-negative number for likes
        comments: z.number().nonnegative("Comments must be a non-negative number"), // Required non-negative number for comments
        shares: z.number().nonnegative("Shares must be a non-negative number"), // Required non-negative number for shares
    })
});
