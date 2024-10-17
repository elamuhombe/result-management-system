// services/ResultService.ts

import { IResult } from "../types/types";
import ResultRepository from "./repositories/ResultRepository";

class ResultService {
  // Other existing methods...

  calculateTotalMarks(result: IResult): number {
    return (
      result.attendance_score +
      result.project_review_score +
      result.assessment_score +
      result.project_submission_score +
      result.linkedin_score
    );
  }

  async getResultWithTotalMarks(uniqueStudentId: string): Promise<any> {
    const result = await ResultRepository.findResultById(uniqueStudentId);
    if (!result) {
      return null;
    }
    const totalMarks = this.calculateTotalMarks(result);
    return {
      ...result,
      totalMarks, // Add totalMarks to the returned object
    };
  }
}

export default new ResultService();
