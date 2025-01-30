const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "manager", "waiter", "chef"],
    default: "user",
  },
});

module.exports = mongoose.model("Users", userSchema);
