const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");

exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice, shippingAddress } = req.body;

    if (items && items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user.id,
      items,
      totalPrice,
      shippingAddress,
    });

    const createdOrder = await order.save();

    await Cart.findOneAndDelete({ user: req.user.id });

    res.status(201).json(createdOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Order creation failed", error: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort("-createdAt");
  res.json(orders);
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    const revenueData = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    const ordersByDay = await Order.aggregate([
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" }, // 1 = Sunday
          orders: { $sum: 1 },
        },
      },
    ]);

    const daysMap = {
      1: "Sun",
      2: "Mon",
      3: "Tue",
      4: "Wed",
      5: "Thu",
      6: "Fri",
      7: "Sat",
    };

    const chartData = [
      { day: "Sun", orders: 0 },
      { day: "Mon", orders: 0 },
      { day: "Tue", orders: 0 },
      { day: "Wed", orders: 0 },
      { day: "Thu", orders: 0 },
      { day: "Fri", orders: 0 },
      { day: "Sat", orders: 0 },
    ];

    ordersByDay.forEach((item) => {
      const dayName = daysMap[item._id];
      const index = chartData.findIndex((d) => d.day === dayName);
      if (index !== -1) {
        chartData[index].orders = item.orders;
      }
    });

    const recentOrders = await Order.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalOrders,
      totalProducts,
      totalUsers,
      totalRevenue,
      recentOrders,
      chartData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Stats fetch failed",
      error: error.message,
    });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
};
