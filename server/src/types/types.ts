//src/types/types.ts

export interface IUser {
  userId: string; // Unique identifier for the user
  username: string; // Username for login
  password: string; // Hashed password
  role: "Admin" | "Student"; // User role
  createdAt?: Date; // Optional timestamp for creation
  updatedAt?: Date; // Optional timestamp for last update
}

export interface IStudent {
  studentId: string; // Unique identifier for the student
  firstName: string; // First name of the student
  lastName: string; // Last name of the student
  email: string; // Student's email address
  results?: string[]; // Array of result IDs (optional)
}

export interface IResult {
  resultId: string; // Unique identifier for the result
  studentId: string; // ID of the student associated with the result
  attendanceMarks?: number; // Marks for attendance (optional)
  projectReviewMarks?: number; // Marks for project review (optional)
  assessmentMarks?: number; // Marks for assessments (optional)
  projectSubmissionMarks?: number; // Marks for project submissions (optional)
  linkedinPostMarks?: number; // Marks for LinkedIn posts (optional)
  totalMarks?: number; // Calculated total marks (optional)
  createdAt?: Date; // Optional timestamp for creation
  updatedAt?: Date; // Optional timestamp for last update
}
