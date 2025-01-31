const express = require("express");
const router = express.Router();
const dishController = require("../controller/dishController.js");
const { auth } = require("../middleware/auth");

router.post("/", auth, dishController.createDish);
router.put("/:id", auth, dishController.updateDish);
router.delete("/:id", auth, dishController.deleteDish);
router.get("/:id", auth, dishController.getDish);
router.get("/dishes", auth, dishController.getAllDishes);

module.exports = router;
