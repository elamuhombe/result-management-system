//src/tests/AttendanceService.test.ts
import { Request } from 'express';
import AttendanceMarksService from '../services/AttendanceService';
import AttendanceRepository from '../services/repositories/AttendanceRepository';
import { IAttendance } from '../types/types';
import { attendanceSchema } from '../validators/AttendanceSchema';

// Mock AttendanceRepository and the attendanceSchema validation
jest.mock('../services/repositories/AttendanceRepository');
jest.mock('../validators/AttendanceSchema', () => ({
  attendanceSchema: {
    parse: jest.fn(),
  },
}));

describe('AttendanceMarksService', () => {
  const mockAttendanceData: IAttendance = {
    uniqueStudentId: 'student_123',
    date: new Date('2024-10-01'),
    status: 'Present',
    attendance_score: 100,
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

  it('should add a new attendance record', async () => {
    (attendanceSchema.parse as jest.Mock).mockReturnValue(mockAttendanceData);
    (AttendanceRepository.prototype.findAttendanceByStudentIdAndDate as jest.Mock).mockResolvedValue(null);
    (AttendanceRepository.prototype.saveAttendance as jest.Mock).mockResolvedValue(mockAttendanceData);

    const attendanceService = new AttendanceMarksService();
    const result = await attendanceService.addAttendanceData(mockRequest(), mockAttendanceData);

    expect(result).toEqual(mockAttendanceData);
    expect(attendanceSchema.parse).toHaveBeenCalledWith(mockAttendanceData);
    expect(AttendanceRepository.prototype.findAttendanceByStudentIdAndDate).toHaveBeenCalledWith('student_123', new Date('2024-10-01'));
    expect(AttendanceRepository.prototype.saveAttendance).toHaveBeenCalledWith(mockAttendanceData);
  });

  // src/tests/AttendanceService.test.ts

it('should throw an error if attendance record already exists', async () => {
    (AttendanceRepository.prototype.findAttendanceByStudentIdAndDate as jest.Mock).mockResolvedValue(mockAttendanceData);
  
    const attendanceService = new AttendanceMarksService();
  
    const expectedDate = new Date('2024-10-01').toISOString(); // Convert the expected date to ISO string
  
    await expect(attendanceService.addAttendanceData(mockRequest(), mockAttendanceData)).rejects.toThrow(
      `Student attendance marks for student with unique student ID student_123 already exist for the date ${expectedDate}.`
    );
  
    expect(AttendanceRepository.prototype.findAttendanceByStudentIdAndDate).toHaveBeenCalledWith('student_123', new Date('2024-10-01'));
    expect(AttendanceRepository.prototype.saveAttendance).not.toHaveBeenCalled();
  });
  
  it('should get attendance data by unique student ID', async () => {
    (AttendanceRepository.prototype.findAttendanceById as jest.Mock).mockResolvedValue(mockAttendanceData);

    const attendanceService = new AttendanceMarksService();
    const result = await attendanceService.getAttendanceDataById(
      mockRequest({ uniqueStudentId: 'student_123' })
    );

    expect(result).toEqual(mockAttendanceData);
    expect(AttendanceRepository.prototype.findAttendanceById).toHaveBeenCalledWith('student_123');
  });

  it('should throw an error if no attendance data is found', async () => {
    (AttendanceRepository.prototype.findAttendanceById as jest.Mock).mockResolvedValue(null);

    const attendanceService = new AttendanceMarksService();

    await expect(
      attendanceService.getAttendanceDataById(mockRequest({ uniqueStudentId: 'non_existent_id' }))
    ).rejects.toThrow(
      `No attendance data found for student with unique ID: non_existent_id`
    );
  });

  it('should get all attendance data', async () => {
    const attendanceList: IAttendance[] = [mockAttendanceData];

    (AttendanceRepository.prototype.findAllAttendance as jest.Mock).mockResolvedValue(attendanceList);

    const attendanceService = new AttendanceMarksService();
    const result = await attendanceService.getAllAttendanceData(mockRequest());

    expect(result).toEqual(attendanceList);
    expect(AttendanceRepository.prototype.findAllAttendance).toHaveBeenCalled();
  });

  it('should update attendance data by unique student ID', async () => {
    const updatedData = { ...mockAttendanceData, attendance_score: 95 };

    (AttendanceRepository.prototype.updateAttendance as jest.Mock).mockResolvedValue(updatedData);

    const attendanceService = new AttendanceMarksService();
    const result = await attendanceService.updateAttendanceData(
      mockRequest({ uniqueStudentId: 'student_123' }, { attendance_score: 95 })
    );

    expect(result).toEqual(updatedData);
    expect(AttendanceRepository.prototype.updateAttendance).toHaveBeenCalledWith('student_123', { attendance_score: 95 });
  });

  it('should throw an error if updating attendance data fails', async () => {
    (AttendanceRepository.prototype.updateAttendance as jest.Mock).mockResolvedValue(null);

    const attendanceService = new AttendanceMarksService();

    await expect(
      attendanceService.updateAttendanceData(
        mockRequest({ uniqueStudentId: 'student_123' }, { attendance_score: 95 })
      )
    ).rejects.toThrow(
      `Error occurred in updating attendance data for student with unique ID: student_123`
    );
  });
});
