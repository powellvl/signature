const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/userController.js");
const auth = require("../middleware/auth.js");

router.post("/signup", userCtrl.signUpUser);
router.post("/login", userCtrl.loginUser);
router.get("/users", auth, userCtrl.getAllUsers);
router.get("/users/:id", auth, userCtrl.getUser);
router.put("/users/:id", auth, userCtrl.updateUser);
router.delete("/users/:id", auth, userCtrl.deleteUser);

module.exports = router;
