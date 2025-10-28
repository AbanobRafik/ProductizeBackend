import express from "express";
import { LoginUser, RegisterUser } from "../Controller/AuthController.js";

const Router = express.Router();

Router.post("/register", RegisterUser);
Router.post("/login", LoginUser);

export default Router;
