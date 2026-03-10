const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    deliveryCharge: { type: Number, default: 5 },
    tax: { type: Number, default: 8 },
    payments: {
      creditCard: { type: Boolean, default: true },
      paypal: { type: Boolean, default: true },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Settings", settingsSchema);
