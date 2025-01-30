const Reservation = require("../models/Reservation.js");

exports.getAllReservation = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOneReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOneReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOneReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOneReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.status(200).json({ message: "Réservation supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
