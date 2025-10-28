import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./Routes/routes.js";
import authRouter from "./Routes/authRoutes.js";
import express from "express";
import serverless from "serverless-http";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", productRouter);
app.use("/api/auth", authRouter);

// Cached connection عشان Serverless Functions
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  try {
    const conn = await mongoose.connect(process.env.Mong_Url);
    cachedDb = conn;
    console.log("Connected to MongoDB");
    return cachedDb;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

// connect to DB عند كل request
app.use(async (req, res, next) => {
  if (!cachedDb) await connectToDatabase();
  next();
});

// Export Serverless Handler
export const handler = serverless(app);
