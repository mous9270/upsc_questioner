export const PORT = 5555;
import dotenv from 'dotenv';
dotenv.config();

// Use the environment variable
export const mongodbURL= process.env.MONGODB_URI;

