const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
    },
    email: {
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
        required: true,
        enum: ["cuisinier", "serveur", "receptionniste", "admin"],
        default: "user",
    },
});

module.exports = mongoose.model("Users", userSchema);
