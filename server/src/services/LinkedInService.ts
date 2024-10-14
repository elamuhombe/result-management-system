//src/services/LinkedinService.ts

import { ILinkedInPostMark } from "../types/types";
import { linkedInSchema } from "../validators/LinkedInSchema";
import LinkedInModel from "../models/LinkedIn";

class LinkedinService{
    async addLinkedInScore(req: Request, linkedInData: ILinkedInPostMark): Promise<ILinkedInPostMark> {

        // Validate the input data using Zod schema
        const validatedLinkedInData = linkedInSchema.parse(linkedInData);
        const { uniqueStudentId, postId, linkedin_score, engagementMetrics } = validatedLinkedInData;
    
        // Check if LinkedIn score already exists for the student
        return LinkedInModel.findOne({ uniqueStudentId, postId })
            .then(existingLinkedInData => {
                if (existingLinkedInData) {
                    throw new Error("LinkedIn Score already exists for this post.");
                }
    
                // Create a new LinkedIn post mark entry
                const newLinkedInData = new LinkedInModel({
                    uniqueStudentId,
                    postId,
                    linkedin_score,
                    engagementMetrics
                });
    
                // Save the new LinkedIn data
                return newLinkedInData.save();
            })
            .catch(err => {
                // Handle any errors
                throw new Error(`Error adding LinkedIn score: ${err.message}`);
            });
    }
    
}