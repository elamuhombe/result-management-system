import { Request } from "express";
import { IAssessmentMark } from "../types/types";
import { AssessmentSchema } from "../validators/AssessmentSchema";
import AssessmentRepository from "./repositories/AssessmentRepository"; // Import the new repository

// Define the AssessmentService class that contains methods related to assessment data management
class AssessmentService {
  private assessmentRepository = new AssessmentRepository();

  // Asynchronous method to add new assessment marks to the database
  async addAssessmentMarks(
    req: Request,
    assessmentData: IAssessmentMark
  ): Promise<IAssessmentMark> {
    const validatedAssessmentData = AssessmentSchema.parse(assessmentData);

    const existingAssessmentData =
      await this.assessmentRepository.findAssessmentById(
        validatedAssessmentData.uniqueStudentId
      );

    if (existingAssessmentData) {
      throw new Error(
        `Assessment data for student with unique id ${validatedAssessmentData.uniqueStudentId} already exists.`
      );
    }

    return this.assessmentRepository.saveAssessment(validatedAssessmentData);
  }

  // Method to get assessment marks for a single student using uniqueStudentId
  public async getAssessmentMarksById(
    uniqueStudentId: string
  ): Promise<IAssessmentMark> {
    const assessmentData = await this.assessmentRepository.findAssessmentById(
      uniqueStudentId
    );

    if (!assessmentData) {
      throw new Error(
        `Assessment data for student with unique ID: ${uniqueStudentId} not found`
      );
    }

    return assessmentData;
  }

  // Method to get all assessment marks
  async getAllAssessmentMarks(req: Request): Promise<IAssessmentMark[]> {
    return this.assessmentRepository.findAllAssessments();
  }

  // Method to update assessment data
  async updateAssessmentData(req: Request): Promise<IAssessmentMark> {
    const { uniqueStudentId } = req.params;
    const updatedData = await this.assessmentRepository.updateAssessment(
      uniqueStudentId,
      req.body
    );

    if (!updatedData) {
      throw new Error(
        `Error updating data for student with unique id: ${uniqueStudentId}`
      );
    }

    return updatedData;
  }
}

// Export the AssessmentService class as the default export
export default AssessmentService;
