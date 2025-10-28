import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./Routes/routes.js";
import authRouter from "./Routes/authRoutes.js";
import express from "express";
import serverless from "serverless-http";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/api", productRouter);
app.use("/api/auth", authRouter);
const port = process.env.PORT || 5000;
const MongoUrl = process.env.Mong_Url;

module.exports.handler = serverless(app);

mongoose
  .connect(MongoUrl)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
