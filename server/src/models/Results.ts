//src/models/Results.ts

import { model, Schema } from "mongoose";
import { IResult } from "../types/types";

const ResultSchema: Schema<IResult & Document> = new Schema({
resultId: {type: String, required: true},
studentId: {type: Schema.Types.ObjectId, ref: "Student", required: true},
attendanceMarks: {type: Number},
projectReviewMarks: {type: Number},
assessmentMarks: {type: Number},
projectSubmissionMarks: {type: Number},
linkedinPostMarks: {type: Number},
totalMarks: {type: Number}
},{timestamps: true})

const ResultModel = model <IResult & Document>("Result", ResultSchema)

export default ResultModel