const express = require("express");
const router = express.Router();
const dishController = require("../controllers/dishController");

router.post("/dish", dishController.createDish);
router.put("/dish/:id", dishController.updateDish);
router.delete("/dish/:id", dishController.deleteDish);
router.get("/dish/:id", dishController.getDish);
router.get("/dishes", dishController.getAllDishes);

module.exports = router;
