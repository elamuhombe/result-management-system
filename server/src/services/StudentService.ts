// src/services/StudentService.ts

import { Request } from "express";
import { ResultModel, StudentModel } from "../models";
import { IResult, IStudent } from "../types/types";
import { studentSchema } from "../validators/StudentSchema";

export class StudentService {
  // Add and save a new student
  addStudent(req: Request, studentData: IStudent): Promise<IStudent> {
    // Validate student data
    const validatedStudentData = studentSchema.parse(studentData);
    const { uniqueStudentId, firstName, lastName, email } = validatedStudentData;

    // Check if there is an existing student
    return StudentModel.findOne({ uniqueStudentId }).then(existingStudent => {
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
    });
  }

  // Retrieve student information
  getStudentData(req: Request): Promise<IStudent | null> {
    const { studentId } = req.params;

    // Find and return the student by studentId
    return StudentModel.findOne({ _id: studentId }).then(studentData => {
      if (!studentData) {
        throw new Error("Student not found");
      }

      return studentData.toObject(); // Return the student data as an object
    });
  }

  // Update student information
  updateStudentData(req: Request): Promise<IStudent | null> {
    const { studentId } = req.params;
    const { firstName, lastName, email } = req.body;

    // Find and update the student
    return StudentModel.findByIdAndUpdate(
      studentId,
      { firstName, lastName, email },
      { new: true, runValidators: true }
    ).then(updatedStudent => {
      if (!updatedStudent) {
        throw new Error("Student not found");
      }

      return updatedStudent.toObject(); // Return the updated student data
    });
  }

  // Manage student results
  manageResults(req: Request, resultsData: IResult): Promise<IResult> {
    const { studentId } = req.params; // Get studentId from URL parameters

    // Find results for the given student
    return ResultModel.findOne({ studentId }) // Use studentId to find results
      .then(result => {
        if (!result) {
          // Create a new result entry if none exists
          result = new ResultModel({
            ...resultsData,
          });
          return result.save(); // Save the new result
        } else {
          // Update existing result entry
          Object.assign(result, resultsData); // Update the result document with new data
          return result.save(); // Save the updated result
        }
      });
  }
}
