const express = require("express");
const router = express.Router();
const dishController = require("../controllers/dishController");
const auth = require("../middleware/auth");

// Middleware de gestion des rôles
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    req.allowedRoles = allowedRoles;  // Passer les rôles autorisés au middleware d'authentification
    next();
  };
};

router.post(
  "/dish",
  auth,
  checkRole(["admin", "chef"]),  // Les rôles autorisés pour cette route
  dishController.createDish
);

router.put(
  "/dish/:id",
  auth,
  checkRole(["admin", "chef"]),
  dishController.updateDish
);

router.delete(
  "/dish/:id",
  auth,
  checkRole(["admin", "chef"]),
  dishController.deleteDish
);

router.get(
  "/dish/:id",
  auth,
  checkRole(["admin", "chef", "user"]),  // Les rôles autorisés pour voir un plat
  dishController.getDish
);

router.get(
  "/dishes",
  auth,
  checkRole(["admin", "chef", "user"]),
  dishController.getAllDishes
);

module.exports = router;
