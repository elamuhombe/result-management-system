//src/services/AttendanceService.ts

import { AttendanceModel } from "../models";
import { IAttendance } from "../types/types";
import { attendanceSchema } from "../validators/AttendanceSchema";



class AttendanceMarksService{
 // add and save attendance marks
addAttendanceData(req: Request, attendanceData: IAttendance): Promise<IAttendance> {
    // Validate attendance data
    const validatedAttendanceData = attendanceSchema.parse(attendanceData);
    const { uniqueStudentId, status, date, marks } = validatedAttendanceData;

    return AttendanceModel.findOne({ uniqueStudentId, date })
        .then(existingAttendanceMarks => {
            // Check if there are existing marks for the student on the specified date
            if (existingAttendanceMarks) {
                throw new Error(`Student attendance marks for student with unique student ID ${uniqueStudentId} already exist for the date ${date}.`);
            }

            // Create and save the student attendance marks
            const newStudentAttendanceMarks = new AttendanceModel({
                uniqueStudentId,
                status,
                date,
                marks
            });

            return newStudentAttendanceMarks.save();
        });
}

       
   // get attendance marks by student_id
}
