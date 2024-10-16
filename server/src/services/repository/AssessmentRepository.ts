//src/services/repository/AssessmentRepository.ts
import { IAssessmentMark } from "../../types/types";
import { AssessmentModel } from "../../models";

class AssessmentRepository {
  // Method to find an assessment by uniqueStudentId
  async findAssessmentById(uniqueStudentId: string): Promise<IAssessmentMark | null> {
    return AssessmentModel.findOne({ uniqueStudentId });
  }

  // Method to save a new assessment
  async saveAssessment(assessmentData: IAssessmentMark): Promise<IAssessmentMark> {
    const newAssessmentData = new AssessmentModel(assessmentData);
    return newAssessmentData.save();
  }

  // Method to find all assessments
  async findAllAssessments(): Promise<IAssessmentMark[]> {
    return AssessmentModel.find({});
  }

  // Method to update assessment data
  async updateAssessment(uniqueStudentId: string, updateData: Partial<IAssessmentMark>): Promise<IAssessmentMark | null> {
    return AssessmentModel.findOneAndUpdate({ uniqueStudentId }, updateData, { new: true });
  }
}

// Export the AssessmentRepository class as the default export
export default AssessmentRepository;
