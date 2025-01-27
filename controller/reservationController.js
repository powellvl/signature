const Reservation = require("../models/Reservation.js");

exports.getAllReservation = (req, res, next) => {
    Reservation.find()
        .then((reservations) => res.status(200).json(reservations))
        .catch((error) => res.status(400).json({ error }));
};

exports.createOneReservation = async (req, res) => {
    try {
        const reservation = new Reservation({
            date: req.body.date,
            tableNumber: req.body.tableNumber,
            clientName: req.body.clientName,
            numberOfPeople: req.body.numberOfPeople,
        });

        const savedReservation = await reservation.save();
        res.status(201).json(savedReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getOneReservation = (req, res, next) => {
    Reservation.findOne({ _id: req.params.id })
        .then((reservation) => {
            if (!reservation) {
                return res
                    .status(404)
                    .json({ message: "Réservation non trouvée" });
            }
            res.status(200).json(reservation);
        })
        .catch((error) => res.status(404).json({ error }));
};

exports.updateOneReservation = (req, res, next) => {
    Reservation.updateOne(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id }
    )
        .then(() => res.status(200).json({ message: "Réservation modifiée !" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteOneReservation = (req, res, next) => {
    Reservation.deleteOne({ _id: req.params.id })
        .then(() =>
            res.status(200).json({ message: "Réservation supprimée !" })
        )
        .catch((error) => res.status(400).json({ error }));
};
