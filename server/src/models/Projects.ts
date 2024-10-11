//src/models/Projects.ts

import mongoose, { model, Schema } from "mongoose";
import { IProject } from "../types/types";

const ProjectSchema: Schema<IProject & Document> = new Schema(
  {
    projectId: { type: String, required: true, unique: true },
    studentId:{  type: mongoose.Schema.Types.ObjectId, required: true, ref: "Students"},
    project_title: { type: String, required: true },
    submission_date: { type: Date, required: true },
    marks_received: { type: Number, required: true },
  },
  { timestamps: true }
);

const ProjectModel = model<IProject & Document>("Project", ProjectSchema);

export default ProjectModel;
