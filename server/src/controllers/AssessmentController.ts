// src/controllers/AssessmentController.ts
import { Request, Response } from "express";
import { AssessmentService } from "../services";
import { IAssessmentMark } from "../types/types";

class AssessmentController {
  private assessmentService = new AssessmentService();

  public async addAssessmentMarks(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { assessmentData }: { assessmentData: IAssessmentMark } = req.body; // Ensure correct typing
      const newAssessmentData = await this.assessmentService.addAssessmentMarks(
        req,
        assessmentData
      ); // Pass both req and assessmentData

      return res
        .status(201)
        .json({
          message: "Assessment data added successfully",
          data: newAssessmentData,
        });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Failed to add assessment data" });
    }
  }

 // Method to get assessment marks for a single student using uniqueStudentId
 public async getAssessmentMarksById(req: Request, res: Response): Promise<Response> {
    const { uniqueStudentId } = req.params; // Extract uniqueStudentId from request parameters

    try {
      // Call the service method to get assessment data
      const assessmentData: IAssessmentMark = await this.assessmentService.getAssessmentMarksById(uniqueStudentId);

      // Return the found assessment data
      return res.status(200).json({
        message: 'Assessment data retrieved successfully',
        data: assessmentData,
      });
    } catch (error: any) {
      // Handle errors and return a response
      return res.status(404).json({
        message: error.message || 'Error fetching student project data',
      });
    }
}
}

export default new AssessmentController();
