const express = require("express");
const router = express.Router();
const dishController = require("../controllers/dishController");
const { auth } = require("../middleware/auth");

router.post(
  "/dish",
  auth,
  checkRole(["admin", "chef"]),
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
  checkRole(["admin", "chef"]),
  dishController.getDish
);
router.get(
  "/dishes",
  auth,
  checkRole(["admin", "chef"]),
  dishController.getAllDishes
);

module.exports = router;
