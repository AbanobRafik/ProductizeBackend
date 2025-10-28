import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./Routes/routes.js";
import authRouter from "./Routes/authRoutes.js";
import express from "express";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", productRouter);
app.use("/api/auth", authRouter);

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URL).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// ----- Vercel serverless export -----
export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res); // let Express handle the request
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}
