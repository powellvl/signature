const mongoose = require("mongoose");

const dishSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['entrée', 'plat', 'dessert'],
            required: true,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Dishes", dishSchema);
