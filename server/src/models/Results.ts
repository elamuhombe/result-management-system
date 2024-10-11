//src/models/Results.ts

import mongoose, { model, Schema } from "mongoose";
import { IResult } from "../types/types";

const ResultSchema: Schema<IResult & Document> = new Schema({
studentId:{  type: mongoose.Schema.Types.ObjectId, required: true, ref: "Students"},
attendanceMarks: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Attendance"},
projectReviewMarks: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"Projects"},
assessmentMarks: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"Assessment"},
projectSubmissionMarks: {type: Number},
linkedinPostMarks: {type:mongoose.Schema.Types.ObjectId, required: true, ref: "LinkedIn"},
totalMarks: {type: Number}
},{timestamps: true})

const ResultModel = model <IResult & Document>("Result", ResultSchema)

export default ResultModel