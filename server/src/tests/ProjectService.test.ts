// src/tests/ProjectService.test.ts
import { Request } from "express";
import mongoose from "mongoose";
import ProjectRepository from "../services/repositories/ProjectRepository";
import ProjectService from "../services/ProjectService"; 
import { IProject } from "../types/types";

// Mock the ProjectRepository
jest.mock("../services/repositories/ProjectRepository");

const mockedProjectRepository = ProjectRepository as jest.MockedClass<typeof ProjectRepository>;

describe("ProjectService", () => {
  let projectService: ProjectService;

  // Define a sample projectData object
  const projectData: IProject = {
    uniqueStudentId: "123",
    project_title: "Test Project",
    submission_date: new Date(),
    project_review_score: 85,
    project_submission_score: 90,
    maximum_score: 100
  };

  beforeEach(() => {
    projectService = new ProjectService();
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  // Helper function to create a mock Request object
  const createMockRequest = (params: any): Request => ({
    params,
    // You can add more properties if needed
    get: jest.fn(),
    header: jest.fn(),
    accepts: jest.fn(),
    acceptsCharsets: jest.fn(),
    // Add other properties/methods if needed for your tests
  }) as unknown as Request;

  describe("addProjectData", () => {
    it("should add project data successfully", async () => {
      const req = createMockRequest({}); // No params needed for this test

      mockedProjectRepository.prototype.findProjectByUniqueId.mockResolvedValue(null); // No existing project
      mockedProjectRepository.prototype.createProject.mockResolvedValue(projectData); // Mock project creation

      const result = await projectService.addProjectData(req, projectData);
      expect(result).toEqual(projectData);
      expect(mockedProjectRepository.prototype.createProject).toHaveBeenCalledWith(projectData);
    });

    it("should throw an error if project data already exists", async () => {
      const req = createMockRequest({});

      mockedProjectRepository.prototype.findProjectByUniqueId.mockResolvedValue(projectData); // Existing project

      await expect(projectService.addProjectData(req, projectData)).rejects.toThrow(
        `Project data for student with unique ID: ${projectData.uniqueStudentId} already exists.`
      );
    });
  });

  describe("updateProjectData", () => {
    it("should update project data successfully", async () => {
      const req = createMockRequest({ uniqueStudentId: "123" }); // Custom Request with params

      const updatedProjectData: IProject = {
        uniqueStudentId: "123",
        project_title: "Updated Project",
        submission_date: new Date(),
        project_review_score: 90,
        project_submission_score: 95,
        maximum_score: 100
      };

      mockedProjectRepository.prototype.updateProject.mockResolvedValue(updatedProjectData); // Mock project update

      const result = await projectService.updateProjectData(req, updatedProjectData);
      expect(result).toEqual(updatedProjectData);
      expect(mockedProjectRepository.prototype.updateProject).toHaveBeenCalledWith("123", updatedProjectData);
    });

    it("should throw an error if no project data is found", async () => {
      const req = createMockRequest({ uniqueStudentId: "123" });

      mockedProjectRepository.prototype.updateProject.mockResolvedValue(null); // No existing project

      await expect(projectService.updateProjectData(req, projectData)).rejects.toThrow(
        `No project data found for existing student with unique ID: ${projectData.uniqueStudentId}`
      );
    });
  });

  describe("getProjectData", () => {
    it("should return project data for a student", async () => {
      const req = createMockRequest({ uniqueStudentId: "123" });

      mockedProjectRepository.prototype.findProjectByUniqueId.mockResolvedValue(projectData); // Mock project retrieval

      const result = await projectService.getProjectData(req);
      expect(result).toEqual(projectData);
    });

    it("should throw an error if project data is not found", async () => {
      const req = createMockRequest({ uniqueStudentId: "123" });

      mockedProjectRepository.prototype.findProjectByUniqueId.mockResolvedValue(null); // No existing project

      await expect(projectService.getProjectData(req)).rejects.toThrow(
        `Project data for student with unique ID: ${projectData.uniqueStudentId} not found`
      );
    });
  });

  describe("getAllProjectData", () => {
    it("should return all project data", async () => {
      const req = createMockRequest({}); // Base Request type

      const allProjectData: IProject[] = [
        {
          uniqueStudentId: "123",
          project_title: "Test Project 1",
          submission_date: new Date(),
          project_review_score: 85,
          project_submission_score: 90,
          maximum_score: 100
        },
        {
          uniqueStudentId: "456",
          project_title: "Test Project 2",
          submission_date: new Date(),
          project_review_score: 80,
          project_submission_score: 85,
          maximum_score: 100
        }
      ];

      mockedProjectRepository.prototype.getAllProjects.mockResolvedValue(allProjectData); // Mock retrieval of all projects

      const result = await projectService.getAllProjectData(req);
      expect(result).toEqual(allProjectData);
    });
  });
});
