//src/tests/ResultService.test.ts
import ResultRepository from '../services/repositories/ResultRepository';
import ResultService from '../services/ResultService';
import { IResult } from '../types/types';

// Mock the ResultRepository
jest.mock('../services/repositories/ResultRepository');

describe('ResultService', () => {
  const mockResult: IResult = {
    uniqueStudentId: 'student_123',
    attendance_score: 90,
    project_review_score: 85,
    assessment_score: 78,
    project_submission_score: 88,
    linkedin_score: 92,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should calculate total marks correctly', () => {
    const totalMarks = ResultService.calculateTotalMarks(mockResult);
    expect(totalMarks).toBe(90 + 85 + 78 + 88 + 92);
  });

  it('should return the result with total marks', async () => {
    // Mock the repository method
    (ResultRepository.findResultById as jest.Mock).mockResolvedValue(mockResult);

    const resultWithTotal = await ResultService.getResultWithTotalMarks('student_123');

    expect(resultWithTotal).toEqual({
      ...mockResult,
      totalMarks: 90 + 85 + 78 + 88 + 92,
    });
  });

  it('should return null if the result is not found', async () => {
    // Mock the repository method to return null
    (ResultRepository.findResultById as jest.Mock).mockResolvedValue(null);

    const resultWithTotal = await ResultService.getResultWithTotalMarks('non_existent_id');

    expect(resultWithTotal).toBeNull();
  });
});