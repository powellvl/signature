const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_HASH);
    const userId = decodedToken.userId;
    req.userId = userId;

    if (req.method === "DELETE" || req.method === "PUT") {
      const role = decodedToken.role;
      if (role !== "admin") {
        return res.status(403).json({ message: "Accès refusé" });
      }
    }
    
    next();
  } catch (error) {
    res.status(401).json({ message: "Non autorisé" });
  }
};
