// src/services/ProjectService.ts
import { Request } from "express";
import { IProject } from "../types/types";
import { projectSchema } from "../validators/ProjectSchema";
import ProjectRepository from "./repositories/ProjectRepository";

class ProjectService {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  // Method to add project data
  async addProjectData(req: Request, projectData: IProject): Promise<IProject> {
    // Validate the incoming project data
    const validatedProjectData = projectSchema.parse(projectData);
    const { uniqueStudentId } = validatedProjectData;

    // Check for existing project data
    const existingProjectData =
      await this.projectRepository.findProjectByUniqueId(uniqueStudentId);
    if (existingProjectData) {
      throw new Error(
        `Project data for student with unique ID: ${uniqueStudentId} already exists.`
      );
    }

    // Create new project data using the repository
    return await this.projectRepository.createProject(validatedProjectData);
  }

  // Method to update project data for a single student
  async updateProjectData(
    req: Request,
    projectData: IProject
  ): Promise<IProject> {
    const { uniqueStudentId } = req.params;
    const validatedProjectData = projectSchema.parse(projectData);

    // Update the project data using the repository
    const updatedProject = await this.projectRepository.updateProject(
      uniqueStudentId,
      validatedProjectData
    );
    if (!updatedProject) {
      throw new Error(
        `No project data found for existing student with unique ID: ${uniqueStudentId}`
      );
    }

    return updatedProject;
  }

  // Method to get project data for a single student using uniqueStudentId
  async getProjectData(req: Request): Promise<IProject> {
    const { uniqueStudentId } = req.params;
    const studentProjectData =
      await this.projectRepository.findProjectByUniqueId(uniqueStudentId);

    if (!studentProjectData) {
      throw new Error(
        `Project data for student with unique ID: ${uniqueStudentId} not found`
      );
    }

    return studentProjectData;
  }

  // Method to get project data for all students
  async getAllProjectData(req: Request): Promise<IProject[]> {
    return await this.projectRepository.getAllProjects();
  }
}

export default ProjectService; // Export the ProjectService class
