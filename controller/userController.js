const User = require("../models/Users.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signUpUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        password: hash,
        role: req.body.role || "user", // rôle par défaut si non spécifié
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.loginUser = (req, res, next) => {
  User.findOne({ name: req.body.name })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Paire login/mot de passe incorrecte",
        });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res.status(401).json({
                message: "Paire login/mot de passe incorrecte",
              });
            } else {
              res.status(200).json({
                userId: user._id,
                role: user.role,
                token: jwt.sign(
                  { userId: user._id, role: user.role },
                  process.env.SECRET_HASH,
                  { expiresIn: "24h" }
                ),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    await User.updateOne({ _id: req.params.id }, { ...req.body });
    res.status(200).json({ message: "Utilisateur mis à jour" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
