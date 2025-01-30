const express = require("express");
const router = express.Router();
const dishController = require("../controller/dishController.js");
const { auth } = require("../middleware/auth");

router.post("/dish", auth, dishController.createDish);
router.put("/dish/:id", auth, dishController.updateDish);
router.delete("/dish/:id", auth, dishController.deleteDish);
router.get("/dish/:id", auth, dishController.getDish);
router.get("/dishes", auth, dishController.getAllDishes);

module.exports = router;
