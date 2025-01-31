const mongoose = require("mongoose");
const Dish = require("./Dish");
const Reservation = require("./Reservation");

const orderSchema = mongoose.Schema({
  Reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation",
    required: true,
  },
  Dish: [
    {
      dishId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dish",
        required: true,
      },
      name: { type: String, required: true },
      type: { type: String, required: true },
    },
  ],
  notes: { type: String },
  is_done: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema, "Order");
