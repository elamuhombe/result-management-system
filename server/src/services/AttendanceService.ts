// src/services/AttendanceService.ts
import { Request } from "express";

import { IAttendance } from "../types/types";
import { attendanceSchema } from "../validators/AttendanceSchema";
import AttendanceRepository from "./repositories/AttendanceRepository";

class AttendanceMarksService {
  private attendanceRepository: AttendanceRepository;

  constructor() {
    this.attendanceRepository = new AttendanceRepository();
  }

 // src/services/AttendanceService.ts
async addAttendanceData(
  req: Request,
  attendanceData: IAttendance
): Promise<IAttendance> {
  const validatedAttendanceData = attendanceSchema.parse(attendanceData);
  const { uniqueStudentId, date } = validatedAttendanceData;

  const existingAttendanceMarks =
    await this.attendanceRepository.findAttendanceByStudentIdAndDate(
      uniqueStudentId,
      date
    );

  if (existingAttendanceMarks) {
    throw new Error(
      `Student attendance marks for student with unique student ID ${uniqueStudentId} already exist for the date ${new Date(date).toISOString()}.`
    );
  }

  return this.attendanceRepository.saveAttendance(validatedAttendanceData);
}


  // Method to get attendance data by unique student ID
  async getAttendanceDataById(req: Request): Promise<IAttendance> {
    const { uniqueStudentId } = req.params;
    const studentAttendanceData =
      await this.attendanceRepository.findAttendanceById(uniqueStudentId);

    // Check if attendance data exists
    if (!studentAttendanceData) {
      throw new Error(
        `No attendance data found for student with unique ID: ${uniqueStudentId}`
      );
    }

    // Return the found attendance data
    return studentAttendanceData;
  }

  // Method to get all attendance data
  async getAllAttendanceData(req: Request): Promise<IAttendance[]> {
    return this.attendanceRepository.findAllAttendance();
  }

  // Method to update attendance data
  async updateAttendanceData(req: Request): Promise<IAttendance> {
    const { uniqueStudentId } = req.params;
    const updates = req.body; // Assuming the update data comes in the request body

    const updatedAttendanceData =
      await this.attendanceRepository.updateAttendance(
        uniqueStudentId,
        updates
      );

    if (!updatedAttendanceData) {
      throw new Error(
        `Error occurred in updating attendance data for student with unique ID: ${uniqueStudentId}`
      );
    }

    return updatedAttendanceData;
  }
}

export default AttendanceMarksService;
