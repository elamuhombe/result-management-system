// src/server.ts
import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

// Load environment variables from .env file
config();

const app = express();
const port = 5300;

// Get MongoDB URI from environment variables
const db_uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(db_uri!)
  .then(() => {
    console.log('Connected to database successfully');
  })
  .catch((error) => {
    console.error('Problem connecting to database:', error);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
