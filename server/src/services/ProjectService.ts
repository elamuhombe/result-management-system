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
// Method to get project data for a single student using uniqueStudentId
async getProjectData(req: Request): Promise<IProject> {
    const { uniqueStudentId } = req.params;

    try {
        // Find the project data for the specified uniqueStudentId
        const studentProjectData = await ProjectModel.findOne({ uniqueStudentId });

        // Check if project data exists
        if (!studentProjectData) {
            throw new Error(`Project data for student with unique ID: ${uniqueStudentId} not found`);
        }

        // Return the found project data
        return studentProjectData;
    } catch (error) {
        throw new Error(`Error fetching student project data`);
    }
}
        
    
// Method to get project data for all students
async getAllProjectData(req: Request): Promise<IProject[]> {
    try {
        // Retrieve all project data from the database
        const allProjectsData: IProject[] = await ProjectModel.find({});

        // Return the found project data
        return allProjectsData;
    } catch (error) {
        throw new Error(`Error fetching all project data`);
    }
}
}
export default ProjectService; // Export the ProjectService class
