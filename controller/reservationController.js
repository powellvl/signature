const Reservation = require("../models/Reservation");
const getAllReservations = async (req, res) => {
  Reservation.find()
    .then((reservations) => res.status(200).json(reservations))
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
const createOneReservation = async (req, res) => {
  const reservation = new Reservation({
    date: req.body.date,
    tableNumber: req.body.tableNumber,
    clientTime: req.body.clientTime,
    numberOfPeople: req.body.numberOfPeople,
    // Add other reservation fields based on your Reservation model
  });

  reservation
    .save()
    .then(() => res.status(201).json({ message: "Réservation créée !" }))
    .catch((error) => res.status(400).json({ error }));
};

const getOneReservation = async (req, res) => {
  const reservationId = req.params.id;

  Reservation.findById(reservationId)
    .then((reservation) => {
      if (!reservation) {
        return res.status(404).json({ message: "Réservation non trouvée" });
      }
      res.status(200).json(reservation);
    })
    .catch((error) => res.status(500).json({ error }));
};

const updateOneReservation = async (req, res) => {
  const reservationId = req.params.id;
  const updatedData = {
    date: req.body.date,
    tableNumber: req.body.tableNumber,
    clientTime: req.body.clientTime,
    numberOfPeople: req.body.numberOfPeople,
    // Add other reservation fields as needed
  };

  Reservation.findByIdAndUpdate(reservationId, updatedData, {
    new: true,
    runValidators: true,
  })
    .then((reservation) => {
      if (!reservation) {
        return res.status(404).json({ message: "Réservation non trouvée" });
      }
      res.status(200).json({ message: "Réservation mise à jour", reservation });
    })
    .catch((error) => res.status(400).json({ error }));
};

const deleteOneReservation = async (req, res) => {
  const reservationId = req.params.id;

  Reservation.findByIdAndDelete(reservationId)
    .then((reservation) => {
      if (!reservation) {
        return res.status(404).json({ message: "Réservation non trouvée" });
      }
      res.status(200).json({ message: "Réservation supprimée" });
    })
    .catch((error) => res.status(400).json({ error }));
};
module.exports = {
  getAllReservations,
  createOneReservation,
  getOneReservation,
  updateOneReservation,
  deleteOneReservation,
};
