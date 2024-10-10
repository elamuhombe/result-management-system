//src/models/Users.ts
import { Schema, Document, model } from "mongoose";
import { IUser } from "../types/types";

// Create the User schema
const UserSchema: Schema<IUser & Document> = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Student"], required: true },
  },
  { timestamps: true }
); // Enable automatic timestamps);

// Export the User model
const UserModel = model<IUser & Document>("Student", UserSchema);
export default UserModel;
