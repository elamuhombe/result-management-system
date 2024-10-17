//src/models/Attendance

import mongoose, { model, Schema } from "mongoose";
import { IAttendance } from "../types/types";

const AttendanceSchema: Schema<IAttendance & Document> = new Schema(
  {

    uniqueStudentId: { type: String, required: true, ref: "Students" },
    date: { type: Date, required: true },
    status: { type: String, enum: ["Present", "Absent"], required: true },
    attendance_score: {type: Number, required: true}
  },
  { timestamps: true }
);

const AttendanceModel = model<IAttendance & Document>(
  "Attendance",
  AttendanceSchema
);

export default AttendanceModel;
