// src/services/ProjectService.ts
import { Request } from "express";
import { ProjectModel } from "../models";
import { IProject } from "../types/types";
import { projectSchema } from "../validators/ProjectSchema";

class ProjectService {
   // Method to add project data
async addProjectData(req: Request, projectData: IProject): Promise<IProject> {
    // Validate the incoming project data
    const validatedProjectData = projectSchema.parse(projectData);

    // Destructure the validated project data
    const { uniqueStudentId } = validatedProjectData;

    // Check for existing project data
    const existingProjectData = await ProjectModel.findOne({ uniqueStudentId });
    if (existingProjectData) {
        throw new Error(`Project data for student with unique ID: ${uniqueStudentId} already exists.`);
    }

    // Create new project data using the spread operator
    const newProjectData = new ProjectModel({
        ...validatedProjectData, // Spread the validated data to include all fields
    });

    return newProjectData.save(); // Save the new project data
}


    // Method to update project data for a single student
async updateProjectData(req: Request, projectData: IProject): Promise<IProject> {
    const { uniqueStudentId } = req.params;

    // Validate the incoming project data
    const validatedProjectData = projectSchema.parse(projectData);

    // Update the project data using the spread operator
    const updatedProject = await ProjectModel.findOneAndUpdate(
        { uniqueStudentId },
        { ...validatedProjectData }, // Spread the validated data
        { new: true, runValidators: true } // Options to return the updated document and run validations
    );

    // Check if the project data was found and updated
    if (!updatedProject) {
        throw new Error(`No project data found for existing student with unique ID: ${uniqueStudentId}`);
    }

    return updatedProject.toObject(); // Return the updated project data as an object
}

    // method to get project data for a single student using uniqueStudentId
    async getProjectData(req: Request): Promise<IProject>{

    }

    //method to get project data for all students
    async getAllProjectData(req: Request): Promise<IProject>{

    }
}
export default ProjectService; // Export the ProjectService class
