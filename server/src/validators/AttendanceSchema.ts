//src/validators/AttendanceSchema.ts
import { z } from 'zod';

// Define the validation schema for the IAttendance interface
export const attendanceSchema = z.object({
  attendanceId: z.string().nonempty("Attendance ID is required"), // Required string for the ObjectId
  studentId: z.string().nonempty("Student ID is required"), // Required string for the ObjectId reference to Student
  date: z.date(), // Required date for the attendance date
  status: z.enum(['Present', 'Absent']), // Required enum for attendance status
});