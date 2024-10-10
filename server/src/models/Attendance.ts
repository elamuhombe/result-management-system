//src/models/Attendance

import { model, Schema } from "mongoose";
import { IAttendance } from "../types/types";

const AttendanceSchema: Schema<IAttendance & Document> = new Schema(
  {
    studentId: { type: String, required: true, unique: true },
    attendanceId: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["Present", "Absent"], required: true },
  },
  { timestamps: true }
);

const AttendanceModel = model<IAttendance & Document>(
  "Attendance",
  AttendanceSchema
);

export default AttendanceModel;
