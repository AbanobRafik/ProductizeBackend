import express from "express";
import {
  AddNewProduct,
  DeleteProduct,
  GetAllProducts,
  ReadProductDetails,
  UpdateProduct,
} from "../Controller/ProductController.js";
import { verifyAdmin, verifyToken } from "../Middlewares/authMiddleware.js";
import {
  deleteUser,
  editUser,
  getUserById,
  showAllUsers,
} from "../Controller/UserController.js";

const Router = express.Router();

// * for any user
Router.get("/all", GetAllProducts);
Router.get("/product/:code", ReadProductDetails);

// * for admin only
Router.post("/add", verifyToken, verifyAdmin, AddNewProduct);
Router.delete("/delete/:code", verifyToken, verifyAdmin, DeleteProduct);
Router.put("/update/:code", verifyToken, verifyAdmin, UpdateProduct);

Router.get("/getallusers", verifyToken, verifyAdmin, showAllUsers);
Router.get("/getuser/:id", verifyToken, verifyAdmin, getUserById);
Router.put("/edituser/:id", verifyToken, verifyAdmin, editUser);
Router.delete("/deleteuser/:id", verifyToken, verifyAdmin, deleteUser);

export default Router;
