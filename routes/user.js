const express = require("express");
const router = express.Router();
const userCtrl = require("./../controller/userController.js");
const auth = require("./../middleware/auth.js");

router.post("/signup", userCtrl.signUpUser);
router.post("/login", userCtrl.loginUser);

module.exports = router;
