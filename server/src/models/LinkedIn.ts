//src/models/LinkedIn.ts

import { model, Schema, SchemaType } from "mongoose";
import { ILinkedInPostMark } from "../types/types";

const LinkedInSchema: Schema<ILinkedInPostMark & Document> = new Schema({
    studentId: {type: String, unique:true, required: true, ref: "Students"},
    postId: {type: String, unique: true, required: true},
    score:{type: Number, required: true},
    engagementMetrics: {
        likes: { type: Number, default: 0 },
        comments: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },
      },
},{timestamps: true})

const LinkeInModel = model <ILinkedInPostMark & Document>("LinkedIn", LinkedInSchema
)

export default LinkeInModel