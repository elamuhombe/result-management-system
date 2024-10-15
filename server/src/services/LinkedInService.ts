//src/services/LinkedInService.ts
import { Request } from "express";
import { ILinkedInPostMark } from "../types/types";
import { linkedInSchema } from "../validators/LinkedInSchema";
import LinkedInModel from "../models/LinkedIn";

class LinkedinService {
  // Function to calculate LinkedIn score based on engagement metrics
  private calculateLinkedInScore(engagementMetrics: {
    likes: number;
    comments: number;
    shares: number;
  }): number {
    const { likes, comments, shares } = engagementMetrics;

    // Define weights
    const weights = {
      likes: 0.2,
      comments: 0.5,
      shares: 0.3,
    };

    // Calculate the score
    const score =
      likes * weights.likes +
      comments * weights.comments +
      shares * weights.shares;

    // Return the score rounded to two decimal places
    return parseFloat(score.toFixed(2));
  }

  async addLinkedInScore(
    req: Request,
    linkedInData: ILinkedInPostMark
  ): Promise<ILinkedInPostMark> {
    // Validate the input data using Zod schema
    const validatedLinkedInData = linkedInSchema.parse(linkedInData);
    const { uniqueStudentId, postId, engagementMetrics } =
      validatedLinkedInData;

    // Calculate the LinkedIn score based on engagement metrics
    const linkedin_score = this.calculateLinkedInScore(engagementMetrics);

    // Check if LinkedIn score already exists for the student
    return LinkedInModel.findOne({ uniqueStudentId, postId })
      .then((existingLinkedInData) => {
        if (existingLinkedInData) {
          throw new Error("LinkedIn Score already exists for this post.");
        }

        // Create a new LinkedIn post mark entry
        const newLinkedInData = new LinkedInModel({
          uniqueStudentId,
          postId,
          linkedin_score,
          engagementMetrics,
        });

        // Save the new LinkedIn data
        return newLinkedInData.save();
      })
      .catch((err) => {
        // Handle any errors
        throw new Error(`Error adding LinkedIn score: ${err.message}`);
      });
  }

  // Method to get LinkedIn Scores for a student using unique student id
  async getLinkedInScoreById(req: Request): Promise<ILinkedInPostMark> {
    const { uniqueStudentId } = req.params;
    try {
      const linkedInData = await LinkedInModel.findOne({ uniqueStudentId });

      if (!linkedInData) {
        throw new Error(
          `Error fetching linkedin data for student with unique id ${uniqueStudentId}`
        );
      }
      return linkedInData;
    } catch (error) {
      throw new Error("Error fetching linkedin data");
    }
  }

  // Method to get all linkedIn Scores
  async getAllLinkedinData(req: Request): Promise<ILinkedInPostMark[]> {
    try {
      const allLinkedInData = await LinkedInModel.find({});
      return allLinkedInData;
    } catch (error) {
      throw new Error("Error fetching all LinkedIn data");
    }
  }
  // Method to update LinkedIn Scores for a student using unique student id
  // Method to update LinkedIn Scores for a student using unique student ID
async updateLinkedInScoreById(
    req: Request,
    updatedScoreData: Partial<ILinkedInPostMark>
  ): Promise<ILinkedInPostMark> {
    const { uniqueStudentId } = req.params;
    
    try {
      // Find the student by uniqueStudentId and update their LinkedIn score
      const updatedLinkedInData = await LinkedInModel.findOneAndUpdate(
        { uniqueStudentId },
        { $set: updatedScoreData },
        { new: true } // Return the updated document
      );
  
      // Check if the student data exists
      if (!updatedLinkedInData) {
        throw new Error(`Student with unique ID: ${uniqueStudentId} not found`);
      }
  
      // Return the updated LinkedIn data
      return updatedLinkedInData;
    } catch (error) {
      throw new Error(`Error updating LinkedIn data`);
    }
  }
  
}

export default new LinkedinService();
