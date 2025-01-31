const express = require("express");
const router = express.Router();
const dishController = require("../controller/dishController.js");
const { auth } = require("../middleware/auth");

router.post("/", dishController.createDish);
router.put("/:id", dishController.updateDish);
router.delete("/:id", dishController.deleteDish);
router.get("/:id", dishController.getDish);
router.get("/", dishController.getAllDishes);

module.exports = router;
