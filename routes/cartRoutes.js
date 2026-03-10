const express = require("express");
const router = express.Router();
const { addToCart, getCart } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

console.log("DEBUG: Auth Middleware Loaded:", typeof protect === "function");
console.log("DEBUG: Cart Controller Loaded:", typeof addToCart === "function");

router.post("/add", protect, addToCart);

router.get("/", protect, getCart);

module.exports = router;
