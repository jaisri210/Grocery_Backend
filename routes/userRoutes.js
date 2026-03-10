const express = require("express");
const router = express.Router();
const {
  loginUser,
  getUserById,
  getAllUsers,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/login", loginUser);
router.get("/", protect, admin, getAllUsers); // 👈 THIS FIXES YOUR 404
router.get("/:id", protect, admin, getUserById);

module.exports = router;
