//src/tests/LinkedInService.test.ts
import { Request } from 'express';
import LinkedInService from '../services/LinkedInService';
import LinkedInRepository from '../services/repositories/LinkedInRepository';
import LinkedInScoreCalculator from '../utils/LinkedInScoreCalculator';
import { ILinkedInPostMark } from '../types/types';
import { linkedInSchema } from '../validators/LinkedInSchema';

// Mock the LinkedInRepository and LinkedInScoreCalculator
jest.mock('../services/repositories/LinkedInRepository');
jest.mock('../validators/LinkedInSchema', () => ({
  linkedInSchema: {
    parse: jest.fn(),
  },
}));
jest.mock('../utils/LinkedInScoreCalculator');

describe('LinkedInService', () => {
  const mockLinkedInData: ILinkedInPostMark = {
    uniqueStudentId: 'student_123',
    postId: 'post_456',
    engagementMetrics: { likes: 10, comments: 5, shares: 2 },
    linkedin_score: 75, // Example score, should be calculated based on metrics
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

  it('should add a new LinkedIn score', async () => {
    // Mock the validation and repository methods
    (linkedInSchema.parse as jest.Mock).mockReturnValue(mockLinkedInData);
    (LinkedInRepository.prototype.findLinkedInScore as jest.Mock).mockResolvedValue(null);
    (LinkedInScoreCalculator.prototype.calculateLinkedInScore as jest.Mock).mockReturnValue(mockLinkedInData.linkedin_score);
    (LinkedInRepository.prototype.saveLinkedInScore as jest.Mock).mockResolvedValue(mockLinkedInData);

    const linkedInService = new LinkedInService();
    const result = await linkedInService.addLinkedInScore(mockRequest(), mockLinkedInData);

    expect(result).toEqual(mockLinkedInData);
    expect(linkedInSchema.parse).toHaveBeenCalledWith(mockLinkedInData);
    expect(LinkedInRepository.prototype.findLinkedInScore).toHaveBeenCalledWith('student_123', 'post_456');
    expect(LinkedInRepository.prototype.saveLinkedInScore).toHaveBeenCalledWith({
      ...mockLinkedInData,
      linkedin_score: mockLinkedInData.linkedin_score,
    });
  });

  it('should throw an error if LinkedIn score already exists', async () => {
    // Mock the repository method
    (LinkedInRepository.prototype.findLinkedInScore as jest.Mock).mockResolvedValue(mockLinkedInData);

    const linkedInService = new LinkedInService();

    await expect(linkedInService.addLinkedInScore(mockRequest(), mockLinkedInData)).rejects.toThrow(
      "LinkedIn Score already exists for this post."
    );

    expect(LinkedInRepository.prototype.findLinkedInScore).toHaveBeenCalledWith('student_123', 'post_456');
    expect(LinkedInRepository.prototype.saveLinkedInScore).not.toHaveBeenCalled();
  });

  it('should get LinkedIn scores by unique student ID', async () => {
    // Mock the repository method
    (LinkedInRepository.prototype.findLinkedInScoresByStudentId as jest.Mock).mockResolvedValue(mockLinkedInData);

    const linkedInService = new LinkedInService();
    const result = await linkedInService.getLinkedInScoreById(mockRequest({ uniqueStudentId: 'student_123' }));

    expect(result).toEqual(mockLinkedInData);
    expect(LinkedInRepository.prototype.findLinkedInScoresByStudentId).toHaveBeenCalledWith('student_123');
  });

  it('should throw an error if no LinkedIn data found for the unique student ID', async () => {
    // Mock the repository method
    (LinkedInRepository.prototype.findLinkedInScoresByStudentId as jest.Mock).mockResolvedValue(null);

    const linkedInService = new LinkedInService();

    await expect(linkedInService.getLinkedInScoreById(mockRequest({ uniqueStudentId: 'non_existent_id' }))).rejects.toThrow(
      `Error fetching LinkedIn data for student with unique ID: non_existent_id`
    );
  });

  it('should get all LinkedIn scores', async () => {
    const linkedInList: ILinkedInPostMark[] = [mockLinkedInData];

    // Mock the repository method
    (LinkedInRepository.prototype.findAllLinkedInScores as jest.Mock).mockResolvedValue(linkedInList);

    const linkedInService = new LinkedInService();
    const result = await linkedInService.getAllLinkedinData(mockRequest());

    expect(result).toEqual(linkedInList);
    expect(LinkedInRepository.prototype.findAllLinkedInScores).toHaveBeenCalled();
  });

  it('should update LinkedIn scores by unique student ID', async () => {
    const updatedData = { ...mockLinkedInData, linkedin_score: 80 };

    // Mock the repository method
    (LinkedInRepository.prototype.updateLinkedInScore as jest.Mock).mockResolvedValue(updatedData);

    const linkedInService = new LinkedInService();
    const result = await linkedInService.updateLinkedInScoreById(mockRequest({ uniqueStudentId: 'student_123' }), { linkedin_score: 80 });

    expect(result).toEqual(updatedData);
    expect(LinkedInRepository.prototype.updateLinkedInScore).toHaveBeenCalledWith('student_123', { linkedin_score: 80 });
  });

  it('should throw an error if updating LinkedIn score fails', async () => {
    // Mock the repository method
    (LinkedInRepository.prototype.updateLinkedInScore as jest.Mock).mockResolvedValue(null);

    const linkedInService = new LinkedInService();

    await expect(linkedInService.updateLinkedInScoreById(mockRequest({ uniqueStudentId: 'student_123' }), {})).rejects.toThrow(
      `Student with unique ID: student_123 not found`
    );
  });
});
