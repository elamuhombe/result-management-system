//src/types/types.ts

import mongoose, { Types } from "mongoose";

export interface IUser {
  username: string; // Username for login
  password: string; // Hashed password
  role: "Admin" | "Student"; // User role
}

export interface IStudent {
  uniqueStudentId: string;
  firstName: string;
  lastName: string;
  email: string;
  results?: string[];
}

export interface IResult {
  studentId: mongoose.Types.ObjectId;
  attendanceMarks: mongoose.Types.ObjectId;
  projectReviewMarks: mongoose.Types.ObjectId;
  assessmentMarks: mongoose.Types.ObjectId;
  projectSubmissionMarks: number;
  linkedinPostMarks: mongoose.Types.ObjectId;
  totalMarks: number;
}

export interface IAttendance {
  studentId: mongoose.Types.ObjectId;
  date: Date;
  status: "Present" | "Absent";
  marks: number;
}

export interface IProject {
  studentId: mongoose.Types.ObjectId // ObjectId reference to Student
  project_title: string; // title of the project
  submission_date: Date; // date of submission
  review_score: number; // marks received for the project review
  submission_score: number // marks received for  the project submission
  maximum_score: number
}

export interface IAssessmentMark {
  studentId: mongoose.Types.ObjectId;
  score: number; // Score achieved in the assessment
  maximumScore: number; // Maximum score for the assessment
}

export interface ILinkedInPostMark {
  studentId: mongoose.Types.ObjectId;
  postId: string; // ID of the LinkedIn post
  score: number; // Score given for the post
  engagementMetrics: {
    likes: number; // Number of likes
    comments: number; // Number of comments
    shares: number; // Number of shares
  };
}
