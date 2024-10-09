//src/models/Users.ts
import mongoose, { Schema, Document } from "mongoose";

// Define the IUser interface
export interface IUser extends Document {
  userId: string; // Unique identifier for the user
  username: string; // Username for login
  password: string; // Hashed password
  role: "Admin" | "Student"; // User role
  createdAt?: Date; // Optional timestamp for creation
  updatedAt?: Date; // Optional timestamp for last update
}

// Create the User schema
const UserSchema: Schema<IUser> = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Student"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving the document
UserSchema.pre<IUser>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Create the User model
const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
