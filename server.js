const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Route Imports
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

console.log("--- VARIABLE CHECK ---");
console.log("authRoutes type:", typeof authRoutes);
console.log("productRoutes type:", typeof productRoutes);
console.log("cartRoutes type:", typeof cartRoutes);
console.log("orderRoutes type:", typeof orderRoutes);
// Load environment variables
dotenv.config();

// Initialize App
const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Database Connection
connectDB();

// 3. API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/settings", settingsRoutes);
// 4. Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});
app.use("/images", express.static(path.join(__dirname, "assets")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
  );
});
