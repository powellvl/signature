const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        tableNumber: {
            type: Number,
            required: true,
        },
        clientName: {
            type: String,
            required: true,
        },
        numberOfPeople: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Reservations", reservationSchema);
