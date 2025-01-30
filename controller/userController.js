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
        role: req.body.role || "user",  // Ajout de la gestion du rôle
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
        res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, process.env.SECRET_HASH, { expiresIn: "24h" }),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => res.status(200).json(users))  // Envoie tous les utilisateurs
    .catch((error) => res.status(500).json({ error }));
};

exports.getUser = (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json(user);  // Envoie les détails de l'utilisateur
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.id;
  const updatedData = {
    name: req.body.name,
    password: req.body.password ? bcrypt.hashSync(req.body.password, 10) : undefined,  // Mise à jour du mot de passe, s'il est fourni
    role: req.body.role,
  };

  User.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json({ message: "Utilisateur mis à jour", user });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.id;

  User.findByIdAndDelete(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json({ message: "Utilisateur supprimé" });
    })
    .catch((error) => res.status(500).json({ error }));
};
