const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getDashboardStats,
  getAllOrders,
  getOrderById,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);

// Dashboard stats (Admin)
router.get("/stats", protect, admin, getDashboardStats);
// Get Order by id
router.get("/:id", protect, admin, getOrderById);
// Get all orders (Admin)
router.get("/", protect, admin, getAllOrders);

module.exports = router;
