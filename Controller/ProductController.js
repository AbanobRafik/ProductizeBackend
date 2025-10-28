import ProductSchema from "../Model/ProductSchema.js";

export const AddNewProduct = async (req, res) => {
  try {
    const { code } = req.body;
    const exist = await ProductSchema.findOne({ code });
    if (exist) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const newProduct = await ProductSchema.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const { code } = req.params;
    const deletedProduct = await ProductSchema.findOneAndDelete({ code });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product does not exist" });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const { code } = req.params;
    const updatedProduct = await ProductSchema.findOneAndUpdate(
      { code },
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product does not exist" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetAllProducts = async (req, res) => {
  try {
    const allProducts = await ProductSchema.find();
    if (allProducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ReadProductDetails = async (req, res) => {
  try {
    const { code } = req.params;
    const productDetails = await ProductSchema.findOne({ code });
    if (!productDetails) {
      return res.status(404).json({ message: "Product does not exist" });
    }
    res.status(200).json(productDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
