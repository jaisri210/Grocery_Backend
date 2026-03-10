const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product detail", error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, countInStock } =
      req.body;

    const product = new Product({
      name,
      price: Number(price),
      description,
      image,
      category,
      countInStock: Number(countInStock),
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid product data", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name ?? product.name;
      product.price = req.body.price ?? product.price;
      product.description = req.body.description ?? product.description;
      product.image = req.body.image ?? product.image;
      product.category = req.body.category ?? product.category;

      if (req.body.countInStock !== undefined) {
        product.countInStock =
          Number(product.countInStock || 0) + Number(req.body.countInStock);
      }

      const updatedProduct = await product.save(); // Save to MongoDB
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.status(200).json({ message: "Product removed successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};
