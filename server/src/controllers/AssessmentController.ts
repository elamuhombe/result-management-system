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
}

export default new AssessmentController();
