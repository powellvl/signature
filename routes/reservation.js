const express = require("express");
const router = express.Router();
const reservationCtrl = require("../controller/reservationController.js");
const { auth, checkRole } = require("../middleware/auth");

router.get("/", auth, reservationCtrl.getAllReservation);
router.post(
  "/",
  auth,
  checkRole(["admin", "manager"]),
  reservationCtrl.createOneReservation
);
router.get("/:id", auth, reservationCtrl.getOneReservation);
router.put(
  "/:id",
  auth,
  checkRole(["admin", "manager"]),
  reservationCtrl.updateOneReservation
);
router.delete(
  "/:id",
  auth,
  checkRole(["admin", "manager"]),
  reservationCtrl.deleteOneReservation
);

module.exports = router;
