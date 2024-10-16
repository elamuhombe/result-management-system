// src/tests/AssessmentService.test.ts
import { Request } from 'express';
import AssessmentService from '../services/AssessmentService';
import AssessmentRepository from '../services/repositories/AssessmentRepository';
import { IAssessmentMark } from '../types/types';
import { AssessmentSchema } from '../validators/AssessmentSchema';

// Mock the AssessmentRepository
jest.mock('../services/repositories/AssessmentRepository');

// Mock the AssessmentSchema
jest.mock('../validators/AssessmentSchema', () => ({
  AssessmentSchema: {
    parse: jest.fn(), // Mock the parse method
  },
}));

describe('AssessmentService', () => {
  const mockAssessmentData: IAssessmentMark = {
    uniqueStudentId: 'student_123',
    assessment_title: 'Math Exam',
    assessment_score: 85,
    submission_date: new Date('2024-01-01'),
    maximumScore: 100,
  };

  const mockRequest = (params = {}, body = {}) => {
    return {
      params: params,
      body: body,
    } as Request;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add new assessment marks if they do not already exist', async () => {
    // Mock repository methods
    (AssessmentRepository.prototype.findAssessmentById as jest.Mock).mockResolvedValue(null);
    (AssessmentRepository.prototype.saveAssessment as jest.Mock).mockResolvedValue(mockAssessmentData);
    (AssessmentSchema.parse as jest.Mock).mockReturnValue(mockAssessmentData); // This line should work now

    const assessmentService = new AssessmentService();
    const result = await assessmentService.addAssessmentMarks(mockRequest(), mockAssessmentData);

    expect(result).toEqual(mockAssessmentData);
    expect(AssessmentRepository.prototype.findAssessmentById).toHaveBeenCalledWith('student_123');
    expect(AssessmentRepository.prototype.saveAssessment).toHaveBeenCalledWith(mockAssessmentData);
  });

  it('should throw an error if assessment data for the student already exists', async () => {
    // Mock repository methods
    (AssessmentRepository.prototype.findAssessmentById as jest.Mock).mockResolvedValue(mockAssessmentData);

    const assessmentService = new AssessmentService();

    await expect(
      assessmentService.addAssessmentMarks(mockRequest(), mockAssessmentData)
    ).rejects.toThrow(`Assessment data for student with unique id ${mockAssessmentData.uniqueStudentId} already exists.`);
    
    expect(AssessmentRepository.prototype.findAssessmentById).toHaveBeenCalledWith('student_123');
    expect(AssessmentRepository.prototype.saveAssessment).not.toHaveBeenCalled();
  });

  it('should get assessment marks by unique student ID', async () => {
    // Mock repository method
    (AssessmentRepository.prototype.findAssessmentById as jest.Mock).mockResolvedValue(mockAssessmentData);

    const assessmentService = new AssessmentService();
    const result = await assessmentService.getAssessmentMarksById('student_123');

    expect(result).toEqual(mockAssessmentData);
    expect(AssessmentRepository.prototype.findAssessmentById).toHaveBeenCalledWith('student_123');
  });

  it('should throw an error if no assessment marks found for the unique student ID', async () => {
    // Mock repository method
    (AssessmentRepository.prototype.findAssessmentById as jest.Mock).mockResolvedValue(null);

    const assessmentService = new AssessmentService();

    await expect(assessmentService.getAssessmentMarksById('non_existent_id')).rejects.toThrow(
      `Assessment data for student with unique ID: non_existent_id not found`
    );
  });

  it('should get all assessment marks', async () => {
    const assessmentList: IAssessmentMark[] = [mockAssessmentData];
    
    // Mock repository method
    (AssessmentRepository.prototype.findAllAssessments as jest.Mock).mockResolvedValue(assessmentList);

    const assessmentService = new AssessmentService();
    const result = await assessmentService.getAllAssessmentMarks(mockRequest());

    expect(result).toEqual(assessmentList);
    expect(AssessmentRepository.prototype.findAllAssessments).toHaveBeenCalled();
  });

  it('should update assessment data for a student', async () => {
    const updatedData = { ...mockAssessmentData, assessment_score: 90 };

    // Mock repository method
    (AssessmentRepository.prototype.updateAssessment as jest.Mock).mockResolvedValue(updatedData);

    const assessmentService = new AssessmentService();
    const result = await assessmentService.updateAssessmentData(mockRequest({ uniqueStudentId: 'student_123' }));

    expect(result).toEqual(updatedData);
    expect(AssessmentRepository.prototype.updateAssessment).toHaveBeenCalledWith('student_123', {});
  });

  it('should throw an error if updating assessment data fails', async () => {
    // Mock repository method
    (AssessmentRepository.prototype.updateAssessment as jest.Mock).mockResolvedValue(null);

    const assessmentService = new AssessmentService();

    await expect(assessmentService.updateAssessmentData(mockRequest({ uniqueStudentId: 'student_123' }))).rejects.toThrow(
      `Error updating data for student with unique id: student_123`
    );
  });
});
