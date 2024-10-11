//src/models/Assessment.ts

import mongoose, { model, Schema } from "mongoose"
import { IAssessmentMark } from "../types/types"

const AssessmentSchema: Schema<IAssessmentMark & Document>= new Schema({
    studentId:{  type: mongoose.Schema.Types.ObjectId, required: true, ref: "Students"},
    assessmentId:{type: String, unique: true, required: true},
    score:{type: Number, required: true},
    maximumScore:{type: Number, required: true}
    
},{timestamps: true})

const AssessmentModel = model <IAssessmentMark & Document>("Assessment", AssessmentSchema)

export default AssessmentModel