const Dish = require("../models/Dish");

exports.createDish = (req, res, next) => {
    const dish = new Dish({
        name: req.body.name,
        type: req.body.type,
    });

    dish
        .save()
        .then(() => res.status(201).json({ message: "Plat créé !" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.updateDish = (req, res, next) => {
    const dishId = req.params.id;
    const updatedData = {
        name: req.body.name,
        type: req.body.type,
    };

    Dish.findByIdAndUpdate(dishId, updatedData, { new: true, runValidators: true })
        .then((dish) => {
            if (!dish) {
                return res.status(404).json({ message: "Plat non trouvé" });
            }
            res.status(200).json({ message: "Plat mis à jour", dish });
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteDish = (req, res, next) => {
    const dishId = req.params.id;

    Dish.findByIdAndDelete(dishId)
        .then((dish) => {
            if (!dish) {
                return res.status(404).json({ message: "Plat non trouvé" });
            }
            res.status(200).json({ message: "Plat supprimé" });
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.getDish = (req, res, next) => {
    const dishId = req.params.id;

    Dish.findById(dishId)
        .then((dish) => {
            if (!dish) {
                return res.status(404).json({ message: "Plat non trouvé" });
            }
            res.status(200).json(dish);
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.getAllDishes = (req, res, next) => {
    Dish.find()
        .then((dishes) => res.status(200).json(dishes))
        .catch((error) => res.status(500).json({ error }));
};
