// src/models/Students.ts
import { Document, model, Schema } from 'mongoose';
import { IStudent } from '../types/types';

// Extend Document to include the IStudent interface
const StudentSchema = new Schema<IStudent & Document>({
  studentId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+@.+\..+/ }, // Basic email format validation
  results: { type: [String], default: [] }
});

// Export the Student model
const Student = model<IStudent & Document>('Student', StudentSchema);
export default Student;
