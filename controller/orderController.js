const Order = require("../models/Order");

const getAllOrders = async (req, res) => {
  Order.find()
    .populate("Dish.dishId")
    .populate("Reservation")
    .then((orders) => res.status(200).json(orders))
    .catch((error) => res.status(500).json({ error: error.message }));
};

const createOneOrder = async (req, res) => {
  const order = new Order({
    Reservation: req.body.Reservation.ReservationId, // Modification ici pour accéder au ReservationId
    Dish: req.body.Dish.map((dish) => ({
      // Transformation du tableau de plats
      dishId: dish.dishId,
      name: dish.name,
      type: dish.type,
    })),
    notes: req.body.notes,
    is_done: req.body.is_done || false,
  });

  order
    .save()
    .then(() => res.status(201).json({ message: "Commande créée !" }))
    .catch((error) => res.status(400).json({ error }));
};

const getOneOrder = async (req, res) => {
  Order.findById(req.params.id)
    .populate("Dish.dishId")
    .populate("Reservation")
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Commande non trouvée" });
      }
      res.status(200).json(order);
    })
    .catch((error) => res.status(500).json({ error }));
};

const updateOneOrder = async (req, res) => {
  const updatedData = {
    Dish: req.body.Dish,
    notes: req.body.notes,
    is_done: req.body.is_done,
  };

  Order.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
    runValidators: true,
  })
    .populate("Dish.dishId")
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Commande non trouvée" });
      }
      res.status(200).json({ message: "Commande mise à jour", order });
    })
    .catch((error) => res.status(400).json({ error }));
};

const deleteOneOrder = async (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Commande non trouvée" });
      }
      res.status(200).json({ message: "Commande supprimée" });
    })
    .catch((error) => res.status(400).json({ error }));
};

module.exports = {
  getAllOrders,
  createOneOrder,
  getOneOrder,
  updateOneOrder,
  deleteOneOrder,
};
