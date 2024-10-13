//src/validators/AttendanceSchema.ts
import { z } from 'zod';

// Define the validation schema for the IAttendance interface
export const attendanceSchema = z.object({
  uniqueStudentId: z.string().nonempty("Student ID is required"),
  studentId: z.string().nonempty("Student ID is required"), // Required string for the ObjectId reference to Student
  date: z.date(), // Required date for the attendance date
  status: z.enum(['Present', 'Absent']), // Required enum for attendance status
  marks: z.number().nonnegative("Marks received must be a non-negative number"), // Required non-negative number for marks received
});