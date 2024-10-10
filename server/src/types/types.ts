//src/types/types.ts

import { Types } from "mongoose";

export interface IUser {
  userId: string; // Unique identifier for the user
  username: string; // Username for login
  password: string; // Hashed password
  role: "Admin" | "Student"; // User role
}

export interface IStudent {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  results?: string[];
}

export interface IResult {
  resultId: string;
  studentId: string;
  attendanceMarks: number;
  projectReviewMarks: number;
  assessmentMarks: number;
  projectSubmissionMarks: number;
  linkedinPostMarks: number;
  totalMarks: number;
}

export interface IAttendance {
  attendanceId: string;
  studentId: string;
  date: Date;
  status: "Present" | "Absent";
  marks: number;
}

export interface IProject {
  projectId: string; // ObjectId
  studentId: string; // ObjectId reference to Student
  project_title: string; // title of the project
  submission_date: Date; // date of submission
  marks_received: number; // marks received for the project
}

export interface IAssessmentMark {
  studentId: string;
  assessmentId: string; // ID of the assessment
  score: number; // Score achieved in the assessment
  maximumScore: number; // Maximum score for the assessment
}

export interface ILinkedInPostMark {
  studentId: string;
  postId: string; // ID of the LinkedIn post
  score: number; // Score given for the post
  engagementMetrics: {
    likes: number; // Number of likes
    comments: number; // Number of comments
    shares: number; // Number of shares
  };
}
