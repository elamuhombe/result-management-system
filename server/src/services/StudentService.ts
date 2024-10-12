// src/services/StudentService.ts

import { Request } from "express";
import { ResultModel, StudentModel } from "../models";
import { IResult, IStudent } from "../types/types";
import { studentSchema } from "../validators/StudentSchema";

export class studentService {
  // Add and save a new student
  async addStudent(req: Request, studentData: IStudent): Promise<IStudent> {
    const validatedStudentData = studentSchema.parse(studentData)
    const { uniqueStudentId, firstName, lastName, email } = validatedStudentData;
  

    // Check if there is an existing student
    const existingStudent = await StudentModel.findOne({ uniqueStudentId});

    if (existingStudent) {
      throw new Error("Student already exists");
    }

    // Create and save a new student
    const newStudent = new StudentModel({
      uniqueStudentId,
      firstName,
      lastName,
      email,
    });
    return newStudent.save(); // Return the saved student
  }

  // Retrieve student information
  async getStudentData(req: Request): Promise<IStudent | null> {
    const { studentId } = req.params;

    // Find and return the student by studentID
    const studentData = await StudentModel.findOne({ _id: studentId });
    if (!studentData) {
      throw new Error("Student not found");
    }
    return studentData.toObject(); // Return the student data as an object
  }

  // Update student information
  async updateStudentData(req: Request): Promise<IStudent | null> {
    const { studentId } = req.params;
    const { firstName, lastName, email } = req.body;

    // Find and update the student
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      studentId,
      { firstName, lastName, email },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      throw new Error("Student not found");
    }

    return updatedStudent.toObject(); // Return the updated student data
  }

  // Manage student results
  async manageResults(req: Request, resultsData: IResult): Promise<IResult> {
    const { studentId } = req.params; // Get studentId from URL parameters

    // Find results for the given student
    let result = await ResultModel.findOne({ studentId }); // Use studentId to find results

    if (!result) {
      // Create a new result entry if none exists
      result = new ResultModel({
        ...resultsData,
      });
      await result.save(); // Save the new result
    } else {
      // Update existing result entry
      Object.assign(result, resultsData); // Update the result document with new data
      await result.save(); // Save the updated result
    }

    return result; // Return the saved result document
  }
}
