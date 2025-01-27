const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/userController.js");
// const auth = require("./../middlewares/auth.js");


// router.get("/",  logementsCtrl.getAllHousing);
// router.post("/", auth, logementsCtrl.createHousing);
// router.get("/:id",  logementsCtrl.getHousingById);
// router.put("/:id", auth, logementsCtrl.updateHousingById);
// router.delete("/:id", auth, logementsCtrl.deleteHousingById);
router.post("/signup", userCtrl.signUpUser);
router.post("/login", userCtrl.loginUser);

module.exports = router;
