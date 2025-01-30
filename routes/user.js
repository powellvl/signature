const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/userController.js");

router.post("/signup", userCtrl.signUpUser);
router.post("/login", userCtrl.loginUser);

module.exports = router;
