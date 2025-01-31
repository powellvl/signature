const express = require("express");
const router = express.Router();
const orderCtrl = require("../controller/orderController.js");
const { auth } = require("../middleware/auth");

router.get("/", auth, orderCtrl.getAllOrders);
router.post("/", auth, orderCtrl.createOneOrder);
router.get("/:id", auth, orderCtrl.getOneOrder);
router.put("/:id", auth, orderCtrl.updateOneOrder);
router.delete("/:id", auth, orderCtrl.deleteOneOrder);

module.exports = router;
