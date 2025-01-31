const express = require("express");
const router = express.Router();
const userCtrl = require("./../controller/userController.js");
const auth = require("./../middleware/auth.js");

router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.post("/signup", userCtrl.signUpUser);
router.post("/login", userCtrl.loginUser);
router.delete("/:id", auth, userCtrl.deleteUser);
router.put("/:id", auth, userCtrl.updateUser);

module.exports = router;
