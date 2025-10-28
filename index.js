import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import serverless from "serverless-http";

import productRouter from "./Routes/routes.js";
import authRouter from "./Routes/authRoutes.js";

dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// dummy root route
app.get("/", (req, res) => res.send("Backend is running"));

// MongoDB cached connection
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// middleware لتوصيل DB قبل أي route
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection failed:", err);
    res.status(500).json({ message: "Database connection error" });
  }
});

// Routes
app.use("/api", productRouter);
app.use("/api/auth", authRouter);

// export Serverless handler
export const handler = serverless(app);
