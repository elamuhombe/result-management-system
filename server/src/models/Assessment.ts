//src/models/Assessment.ts

import { model, Schema } from "mongoose"
import { IAssessmentMark } from "../types/types"

const AssessmentSchema: Schema<IAssessmentMark & Document>= new Schema({
    studentId:{type: Schema.ObjectId, unique: true, required: true, ref: "Students"},
    assessmentId:{type: String, unique: true, required: true},
    score:{type: Number, required: true},
    maximumScore:{type: Number, required: true}
    
},{timestamps: true})

const AssessementModel = model <IAssessmentMark & Document>("Assessment", AssessmentSchema)

export default AssessementModel