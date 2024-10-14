// src/models/LinkedIn.ts

import mongoose, { model, Schema, Document } from "mongoose";
import { ILinkedInPostMark } from "../types/types";

// Define the LinkedIn schema
const LinkedInSchema: Schema<ILinkedInPostMark & Document> = new Schema({
  uniqueStudentId: { type: String, required: true, ref: "Students" }, // ObjectId reference to Students
  postId: { type: String, unique: true, required: true }, // Unique post ID
  linkedin_score: { type: Number, required: true }, // Score for the LinkedIn post
  engagementMetrics: {
    likes: { type: Number, default: 0 }, // Default 0 for likes
    comments: { type: Number, default: 0 }, // Default 0 for comments
    shares: { type: Number, default: 0 }, // Default 0 for shares
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create the model using the schema
const LinkedInModel = model<ILinkedInPostMark & Document>("LinkedIn", LinkedInSchema);

export default LinkedInModel;
