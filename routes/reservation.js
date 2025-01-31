const express = require("express");
const router = express.Router();
const reservationCtrl = require("../controller/reservationController.js");
const { auth } = require("../middleware/auth");

router.get("/", auth, reservationCtrl.getAllReservations);
router.post("/", auth, reservationCtrl.createOneReservation);
router.get("/:id", auth, reservationCtrl.getOneReservation);
router.put("/:id", auth, reservationCtrl.updateOneReservation);
router.delete("/:id", auth, reservationCtrl.deleteOneReservation);

module.exports = router;
