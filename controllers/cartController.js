const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (p) => p.productId.toString() === productId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += Number(quantity);

        if (cart.items[itemIndex].quantity <= 0) {
          cart.items.splice(itemIndex, 1);
        }
      } else {
        if (Number(quantity) > 0) {
          cart.items.push({ productId, quantity: Number(quantity) });
        }
      }

      await cart.save();
    } else {
      cart = await Cart.create({
        user: userId,
        items: [{ productId, quantity: Number(quantity) }],
      });
    }

    const populatedCart = await Cart.findOne({ user: userId }).populate(
      "items.productId",
    );

    res.status(200).json(populatedCart);
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({
      message: "Server error updating cart",
      error: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.productId",
    );

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({
      message: "Error fetching cart",
      error: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
};
