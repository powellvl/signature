const express = require("express");
const router = express.Router();
const reservationCtrl = require("../controller/reservationController.js");

router.get("/", reservationCtrl.getAllReservation);
router.post("/", reservationCtrl.createOneReservation);
router.get("/:id", reservationCtrl.getOneReservation);
router.put("/:id", reservationCtrl.updateOneReservation);
router.delete("/:id", reservationCtrl.deleteOneReservation);

module.exports = router;
