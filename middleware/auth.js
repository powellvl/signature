const jwt = require("jsonwebtoken");
const User = require("../models/Users");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_HASH);
    const userId = decodedToken.userId;
    req.auth = { userId };
    next();
  } catch (error) {
    res.status(401).json({ error: "Non autorisé" });
  }
};

exports.checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.auth.userId);
      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }
      next();
    } catch (error) {
      res.status(500).json({ error });
    }
  };
};
