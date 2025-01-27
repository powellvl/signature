const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Users", userSchema);
