// src/models/AssessmentModel.ts

import mongoose, { Document, Schema } from "mongoose";
import { IAssessmentMark } from "../types/types"; // Adjust import path as necessary

// Create a Mongoose schema for assessment marks
const assessmentMarkSchema: Schema = new Schema<IAssessmentMark>(
  {
    uniqueStudentId: {
      type: String,
      required: true,
      trim: true, // Trim whitespace
    },
    assessment_title: {
      type: String,
      required: true,
      trim: true,
    },
    submission_date: {
        type: Date,
        required: true, // Make this field required
    },
    assessment_score: {
      type: Number,
      required: true,
      min: 0, // Minimum value
    },
    maximumScore: {
      type: Number,
      required: true,
      min: 1, // Minimum value
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt timestamps
  }
);

// Create a model from the schema
const AssessmentModel = mongoose.model<IAssessmentMark & Document>(
  "AssessmentMark",
  assessmentMarkSchema
);

export default AssessmentModel ; // Export the model
