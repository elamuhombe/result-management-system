// src/models/Project.ts

import mongoose, { model, Schema } from "mongoose";
import { IProject } from "../types/types";

// Define the schema for Project
const ProjectSchema: Schema<IProject & Document> = new Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Students" }, // Reference to the Student model
    uniqueStudentId: { type: String, required: true, ref: "Students" },
    project_title: { type: String, required: true }, // Title of the project
    submission_date: { type: Date, required: true }, // Date of submission
    project_review_score: { type: Number, required: true }, // Marks received for the project review
    project_submission_score: { type: Number, required: true }, // Marks received for the project submission
    maximum_score: { type: Number, required: true }, // Maximum score possible
}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

// Export the Project model
const ProjectModel = model<IProject & Document>("Project", ProjectSchema);

export default ProjectModel;
