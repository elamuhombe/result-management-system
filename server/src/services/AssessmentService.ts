//src/services/AssessmentService.ts
import { Request } from "express";
import { IAssessmentMark, IProject } from "../types/types";
import { AssessmentSchema } from "../validators/AssessmentSchema";
import { AssessmentModel } from "../models";

// Define the AssessmentService class that contains methods related to assessment data management
class AssessmentService {
  // Asynchronous method to add new assessment marks to the database
  async addAssessmentMarks(
    req: Request, // Request object to access request data
    assessmentData: IAssessmentMark // Data representing assessment marks
  ): Promise<IAssessmentMark> {
    // Validate the incoming assessment data using AssessmentSchema
    const validatedAssessmentData = AssessmentSchema.parse(assessmentData);
  
    // Check if assessment data for the given student already exists
    return AssessmentModel.findOne({ uniqueStudentId: validatedAssessmentData.uniqueStudentId }).then(
      (existingAssessmentData) => {
        // If data already exists, throw an error
        if (existingAssessmentData) {
          throw new Error(
            `Assessment data for student with unique id ${validatedAssessmentData.uniqueStudentId} already exists.`
          );
        }
  
        // Create a new assessment entry using the spread operator
        const newAssessmentData = new AssessmentModel({
          ...validatedAssessmentData, // Spread the validated data into the new object
        });
  
        // Save the new assessment data to the database and return the saved object
        return newAssessmentData.save();
      }
    );
  }
  
  // Method to get assessment marks for a single student using uniqueStudentId
  public async getAssessmentMarksById(uniqueStudentId: string): Promise<IAssessmentMark> {
    try {
      // Find the assessment data for the specified uniqueStudentId
      const assessmentData = await AssessmentModel.findOne({
        uniqueStudentId, // Search criteria for finding the assessment data
      });

      // Check if assessment data exists
      if (!assessmentData) {
        throw new Error(`Assessment data for student with unique ID: ${uniqueStudentId} not found`);
      }

      // Return the found assessment data
      return assessmentData;
    } catch (error) {
      throw new Error(`Error fetching student project data: `); // Handle any errors during data fetching
    }
  }

  // Method to get all assessment marks
  async getAllAssessmentMarks(req: Request): Promise<IAssessmentMark[]> {
    try {
      // Retrieve all assessment marks from the database
      const allAssessmentMarks: IAssessmentMark[] = await AssessmentModel.find(
        {}
      );
      // Return all assessment marks
      return allAssessmentMarks;
    } catch (error) {
      throw new Error("Error fetching all assessment data"); // Handle errors in fetching data
    }
  }

  // Method to update assessment data
  async updateAssessmentData(req: Request): Promise<IAssessmentMark>{
    try {
      // Extract uniqueStudentId from the request parameters
      const { uniqueStudentId } = req.params;
      // Find and update the assessment data for the specified uniqueStudentId
      const updatedData = await AssessmentModel.findOneAndUpdate({ uniqueStudentId });
      // Check if the update was successful
      if (!updatedData) {
        throw new Error(`Error updating data for student with unique id: ${uniqueStudentId}`);
      }
      // Return the updated assessment data
      return updatedData;
    } catch (error) {
      throw new Error('Error occurred in updating assessment data'); // Handle errors during the update
    }
  }
}

// Export the AssessmentService class as the default export
export default AssessmentService;
