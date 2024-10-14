// src/models/Results.ts

import mongoose, { model, Schema, Document } from "mongoose";
import { IResult } from "../types/types";

const ResultSchema: Schema<IResult & Document> = new Schema({
  uniqueStudentId: { type: String, required: true, ref: "Students" }, // Reference to the student
  attendance_score: { type: Number, required: true }, // Attendance score
  project_review_score: { type: Number, required: true }, // Project review score
  assessment_score: { type: Number, required: true }, // Assessment score
  project_submission_score: { type: Number }, // Project submission score
  linkedin_score: { type: Number, required: true }, // LinkedIn post score
}, { timestamps: true });

const ResultModel = model<IResult & Document>("Result", ResultSchema);

export default ResultModel;
