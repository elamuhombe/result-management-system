import { Request } from "express";
import { ILinkedInPostMark } from "../types/types";
import { linkedInSchema } from "../validators/LinkedInSchema";
import LinkedInRepository from "./repositories/LinkedInRepository";
import LinkedInScoreCalculator from "../utils/LinkedInScoreCalculator";

class LinkedInService {
  private linkedInRepository: LinkedInRepository; // Repository instance for managing LinkedIn data
  private scoreCalculator: LinkedInScoreCalculator; // Score calculator instance for calculating scores

  constructor() {
    // Initialize the repository and score calculator in the constructor
    this.linkedInRepository = new LinkedInRepository();
    this.scoreCalculator = new LinkedInScoreCalculator();
  }

  // Method to add a LinkedIn score based on provided data
  async addLinkedInScore(
    req: Request, // Request object for accessing request parameters
    linkedInData: ILinkedInPostMark // LinkedIn data to be added
  ): Promise<ILinkedInPostMark> {
    try {
      // Validate the input data using Zod schema
      const validatedLinkedInData = linkedInSchema.parse(linkedInData);
      const { uniqueStudentId, postId, engagementMetrics } = validatedLinkedInData;

      // Calculate the LinkedIn score based on engagement metrics
      const linkedin_score = this.scoreCalculator.calculateLinkedInScore(engagementMetrics);

      // Check if a LinkedIn score already exists for the student and post
      const existingLinkedInData = await this.linkedInRepository.findLinkedInScore(uniqueStudentId, postId);
      if (existingLinkedInData) {
        throw new Error("LinkedIn Score already exists for this post."); // Error if score already exists
      }

      // Create a new LinkedIn post mark entry with the calculated score
      const newLinkedInData = await this.linkedInRepository.saveLinkedInScore({
        ...validatedLinkedInData,
        linkedin_score, // Include the calculated score in the saved data
      });

      return newLinkedInData; // Return the newly created LinkedIn data
    } catch (error: any) {
      // Log any errors that occur during processing
      console.error("Error in addLinkedInScore:", error);

      // Rethrow the specific error if it's one of your defined error types
      if (error.message === "LinkedIn Score already exists for this post.") {
        throw error; // Rethrow the specific error
      }

      // Throw a new error with additional details for debugging
      throw new Error(`Error adding LinkedIn score: ${error.message}`); // Include original error message for debugging
    }
  }

  // Method to get LinkedIn Scores for a student using unique student id
  async getLinkedInScoreById(req: Request): Promise<ILinkedInPostMark> {
    const { uniqueStudentId } = req.params; // Extract unique student ID from request parameters
    const linkedInData = await this.linkedInRepository.findLinkedInScoresByStudentId(uniqueStudentId); // Fetch LinkedIn data by student ID

    if (!linkedInData) {
      throw new Error(`Error fetching LinkedIn data for student with unique ID: ${uniqueStudentId}`); // Error if no data found
    }
    return linkedInData; // Return the fetched LinkedIn data
  }

  // Method to get all LinkedIn Scores
  async getAllLinkedinData(req: Request): Promise<ILinkedInPostMark[]> {
    return await this.linkedInRepository.findAllLinkedInScores(); // Fetch and return all LinkedIn scores
  }

  // Method to update LinkedIn Scores for a student using unique student ID
  async updateLinkedInScoreById(
    req: Request, // Request object for accessing request parameters
    updatedScoreData: Partial<ILinkedInPostMark> // Updated score data
  ): Promise<ILinkedInPostMark> {
    const { uniqueStudentId } = req.params; // Extract unique student ID from request parameters

    // Update the LinkedIn score using the repository
    const updatedLinkedInData = await this.linkedInRepository.updateLinkedInScore(uniqueStudentId, updatedScoreData);

    if (!updatedLinkedInData) {
      throw new Error(`Student with unique ID: ${uniqueStudentId} not found`); // Error if student not found
    }

    return updatedLinkedInData; // Return the updated LinkedIn data
  }
}

export default LinkedInService; // Export the LinkedInService class for use in other modules
