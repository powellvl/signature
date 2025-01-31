const express = require("express");
const router = express.Router();
const userCtrl = require("./../controller/userController.js");
const auth = require("./../middleware/auth.js");

router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
router.post("/signup", userCtrl.signUpUser);
router.post("/login", userCtrl.loginUser);
router.delete("/:id", userCtrl.deleteUser);
router.put("/:id", userCtrl.updateUser);

module.exports = router;
