const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");

// --- PUBLIC ROUTES ---
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// --- ADMIN ONLY ROUTES ---
// 1. POST /api/products -> Add a new product
router.post("/", protect, admin, createProduct);

// 2. PUT /api/products/:id -> Update an existing product
router.put("/:id", protect, admin, updateProduct);

// 3. DELETE /api/products/:id -> Remove a product
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
