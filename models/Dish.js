const mongoose = require("mongoose");

const dishSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: Number,
            required: true,
        },
    }
);

module.exports = mongoose.model("Dishes", dishSchema);
