const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    pictures: { type: [String], required: true, default: ["https://picsum.photos/1600"] },
});

module.exports = mongoose.model("Users", usersSchema);