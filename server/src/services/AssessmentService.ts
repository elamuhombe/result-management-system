import { error } from "console";
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

    // Destructure validated fields from the validated assessment data
    const {
      uniqueStudentId,
      assessment_title,
      assessment_score,
      submission_date,
      maximumScore,
    } = validatedAssessmentData;

    // Check if assessment data for the given student already exists
    return AssessmentModel.findOne({ uniqueStudentId }).then(
      (existingAssessmentData) => {
        // If data already exists, throw an error
        if (existingAssessmentData) {
          throw error(
            `assessment data for student with unique id ${uniqueStudentId} already exists `
          );
        }

        // Create a new assessment entry if no existing data is found
        const newAssessmentData = new AssessmentModel({
          uniqueStudentId,
          assessment_title,
          assessment_score,
          submission_date,
          maximumScore,
        });

        // Save the new assessment data to the database and return the saved object
        return newAssessmentData.save();
      }
    );
  }
  // Method to get assessment marks for a single student using uniqueStudentId
  async getAssessmentMarksById(req: Request): Promise<IAssessmentMark> {
    const { uniqueStudentId } = req.params;

    try {
      // Find the project data for the specified uniqueStudentId
      const assessmentProjectData = await AssessmentModel.findOne({
        uniqueStudentId,
      });

      // Check if project data exists
      if (!assessmentProjectData) {
        throw new Error(
          `Project data for student with unique ID: ${uniqueStudentId} not found`
        );
      }

      // Return the found project data
      return assessmentProjectData;
    } catch (error) {
      throw new Error(`Error fetching student project data`);
    }
  }
  // get all assessment marks'
  async getAllAssessmentMarks(req: Request): Promise<IAssessmentMark[]> {
    try {
      const allAssessmentMarks: IAssessmentMark[] = await AssessmentModel.find(
        {}
      );
      // return all assessment marks
      return allAssessmentMarks;
    } catch (error) {
      throw new Error("Error fetching all assessment data");
    }
  }
}

export default AssessmentService;
