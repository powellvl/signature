const jwt = require("jsonwebtoken");
 
const authMiddleware = (allowedRoles = null) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_HASH);
      const userId = decodedToken.userId;
      const userRole = decodedToken.role;
      
      req.userId = userId;
      req.userRole = userRole;
 
      if (allowedRoles && !allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Rôle non autorisé" });
      }
 
      if ((req.method === "DELETE" || req.method === "PUT") && userRole !== "admin") {
        return res.status(403).json({ message: "Accès refusé" });
      }
 
      next();
    } catch (error) {
      res.status(401).json({ message: "Non autorisé" });
    }
  };
};
 
module.exports = authMiddleware;
