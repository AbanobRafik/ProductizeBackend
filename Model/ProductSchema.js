import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Product code is required"],
    trim: true,
    unique: true,
    uppercase: true,
  },
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters."],
    maxlength: [100, "Name is too large."],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price must be positive."],
    max: [1_000_000, "Price is too large."],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
    minlength: [15, "Description must be at least 15 characters."],
    maxlength: [1000, "Description is too large."],
  },
  image: {
    type: String,
    required: [true, "Product image is required"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
    trim: true,
    enum: [
      "Electronics",
      "Clothing",
      "Books",
      "Home Appliances",
      "Toys",
      "Cars",
    ],
  },
});

export default mongoose.model("Product", ProductSchema);
