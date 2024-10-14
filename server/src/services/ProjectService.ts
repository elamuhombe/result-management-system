// src/services/ProjectService.ts
import { Request } from "express";
import { ProjectModel } from "../models";
import { IProject } from "../types/types";
import { projectSchema } from "../validators/ProjectSchema";

class ProjectService {
    async addProjectMarks(req: Request): Promise<IProject> {
        // Extract project data from the request body
        const projectData = req.body;

        // Validate project submission data
        const validatedProjectSubmissionData = projectSchema.parse(projectData);
        const { uniqueStudentId, project_title, submission_date, review_score, submission_score, maximum_score } = validatedProjectSubmissionData;

        // Check for existing project marks
        const existingProjectMarks = await ProjectModel.findOne({ uniqueStudentId });

        // Check if there are existing marks for the student
        if (existingProjectMarks) {
            throw new Error(`Student project submission marks for student with unique student ID ${uniqueStudentId} already exist.`);
        }

        // Create and save the new project submission marks
        const newStudentProjectSubmissionMarks = new ProjectModel({
            uniqueStudentId,
            project_title,
            submission_date,
            review_score,
            submission_score,
            maximum_score
        });

        return newStudentProjectSubmissionMarks.save(); // Return the saved project data
    }

    // Get project data for a specific student using uniqueId
    async getProjectDataByUniqueId(req: Request): Promise<IProject> {
        const { uniqueStudentId } = req.params;
        const existingProjectData = await ProjectModel.findOne({ uniqueStudentId });

        // Check if project data exists
        if (!existingProjectData) {
            throw new Error(`No project data found for existing student with unique student ID: ${uniqueStudentId}`);
        }
        return existingProjectData.toObject(); // Return the project data as an object
    }

    // Get all project data for all students
    async getAllProjects(): Promise<IProject[]> {
        return ProjectModel.find({}).then(projects => {
            return projects.map(project => project.toObject()); // Return an array of project objects
        });
    }
}

export default ProjectService; // Export the ProjectService class
