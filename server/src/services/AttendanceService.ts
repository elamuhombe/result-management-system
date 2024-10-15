//src/services/AttendanceService.ts
import { Request } from "express";
import { AttendanceModel } from "../models";
import { IAttendance } from "../types/types";
import { attendanceSchema } from "../validators/AttendanceSchema";

class AttendanceMarksService {
  // add and save attendance marks
  async addAttendanceData(
    req: Request,
    attendanceData: IAttendance
  ): Promise<IAttendance> {
    // Validate attendance data
    const validatedAttendanceData = attendanceSchema.parse(attendanceData);
    const { uniqueStudentId, date } = validatedAttendanceData;
  
    return AttendanceModel.findOne({ uniqueStudentId, date }).then(
      (existingAttendanceMarks) => {
        // Check if there are existing marks for the student on the specified date
        if (existingAttendanceMarks) {
          throw new Error(
            `Student attendance marks for student with unique student ID ${uniqueStudentId} already exist for the date ${date}.`
          );
        }
  
        // Create and save the student attendance marks using the spread operator
        const newStudentAttendanceMarks = new AttendanceModel({
          ...validatedAttendanceData,
        });
  
        return newStudentAttendanceMarks.save();
      }
    );
  }
  

  // Method to get attendance data by unique student ID
  async getAttendanceDataById(req: Request): Promise<IAttendance> {
    const { uniqueStudentId } = req.params;
    try {
      const studentAttendanceData = await AttendanceModel.findOne({
        uniqueStudentId,
      });

      // Check if attendance data exists
      if (!studentAttendanceData) {
        throw new Error(
          `No attendance data found for student with unique ID: ${uniqueStudentId}`
        );
      }

      // Return the found attendance data
      return studentAttendanceData;
    } catch (error) {
      throw new Error(`Error fetching attendance data:`);
    }
  }

  //Method to get all attendance data
  async getAllAttendanceData(req: Request): Promise<IAttendance[]> {
    try {
      const allAttendanceData = AttendanceModel.find({});
      return allAttendanceData;
    } catch (error) {
      throw new Error("Error fetching all attendance data");
    }
  }
}
