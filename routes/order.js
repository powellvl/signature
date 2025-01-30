const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Dish = require("../models/Dish");

// Créer une nouvelle commande
router.post("/", async (req, res) => {
  try {
    // Vérifier que tous les plats existent
    const dishPromises = req.body.dishes.map((item) =>
      Dish.findById(item.dish)
    );
    const dishes = await Promise.all(dishPromises);

    // Calculer le prix total
    let totalPrice = 0;
    dishes.forEach((dish, index) => {
      if (!dish) throw new Error("Plat non trouvé");
      totalPrice += dish.price * req.body.dishes[index].quantity;
    });

    // Créer la commande
    const order = new Order({
      ...req.body,
      totalPrice,
    });

    const savedOrder = await order.save();
    await savedOrder.populate("dishes.dish reservation");

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtenir toutes les commandes
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("dishes.dish reservation");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtenir une commande spécifique
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "dishes.dish reservation"
    );
    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour le statut d'une commande
router.patch("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("dishes.dish reservation");

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
