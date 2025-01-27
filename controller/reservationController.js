const Reservation = require("../models/Reservation.js");

exports.getAllReservations = (req, res, next) => {
    Reservation.find()
        .then((reservations) => res.status(200).json(reservations))
        .catch((error) => res.status(400).json({ error }));
};

exports.createOneReservation = (req, res, next) => {
    const reservation = new Reservation({
        ...req.body,
    });
    reservation
        .save()
        .then(() =>
            res
                .status(201)
                .json({ message: "La réservation vient d'être créée !" })
        )
        .catch((error) => res.status(400).json({ error: error }));
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
