//src/controllers/StudentController.ts
import { Request, Response } from "express";
import { StudentService } from "../services";
import { IStudent } from "../types/types";

class StudentController {
  private studentService = new StudentService();
  // add a new student
  public async addStudent(req: Request, res: Response): Promise<Response> {
    const studentData: IStudent = req.body;
    try {
      const newStudentData = await this.studentService.addStudent(
        req,
        studentData
      );
      return res.status(201).json({
        message: "student data saved successfully",
        data: newStudentData,
      });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "saving of student data failed" });
    }
  }
  // Get a student
  public async getStudentData(req: Request, res: Response): Promise<Response> {
    try {
      // Extract uniqueStudentId from req.params
      const { uniqueStudentId } = req.params;

      // Fetch student data using the service
      const studentData = await this.studentService.getStudentData({
        uniqueStudentId,
      });

      if (studentData) {
        // Return student data if found
        return res.status(200).json({
          message: "Student data retrieved successfully",
          data: studentData,
        });
      } else {
        // Return 404 if student not found
        return res.status(404).json({
          message: "Student not found",
        });
      }
    } catch (error: any) {
      // Handle errors (e.g., database issues)
      return res
        .status(500)
        .json({ message: error.message || "Failed to retrieve student data" });
    }
  }

  // update student data
}
export default new StudentController();
