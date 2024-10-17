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
  results?: [];
}

export interface IResult {
  uniqueStudentId: string;
  //studentId: mongoose.Types.ObjectId;
  attendance_score: number;
  project_review_score: number;
  assessment_score: number;
  project_submission_score: number;
  linkedin_score: number;
}

export interface IAttendance {
  uniqueStudentId: string;
  date: Date;
  status: "Present" | "Absent";
  attendance_score: number;
}

export interface IProject {
  uniqueStudentId: string;
  project_title: string; // title of the project
  submission_date: Date; // date of submission
  project_review_score: number; // marks received for the project review
  project_submission_score: number // marks received for  the project submission
  maximum_score: number
}

export interface IAssessmentMark {
  uniqueStudentId: string;
  assessment_title: string;
  assessment_score: number; // Score achieved in the assessment
  submission_date: Date,
  maximumScore: number; // Maximum score for the assessment
}

export interface ILinkedInPostMark {
  uniqueStudentId: string;
  postId: string; // ID of the LinkedIn post
  linkedin_score: number; // Score given for the post
  engagementMetrics: {
    likes: number; // Number of likes
    comments: number; // Number of comments
    shares: number; // Number of shares
  };
}
