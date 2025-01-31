const express = require("express");
const mongoose = require("mongoose");
const reservation = require("./models/Reservation.js");
const user = require("./models/Users.js");
const reservationRoutes = require("./routes/reservation.js");
const userRoutes = require("./routes/user.js");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permet de dire que tout le monde peut y accéder
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); // L'autorisation ici de certains en-tête
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next(); // L'autorisation des différentes méthodes HHTP
});

app.use("/api/user", userRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/dishe", require("./routes/dish"));

mongoose
  .connect(
    "mongodb+srv://luca:azeazeaze@cluster0.kyumz.mongodb.net/signature?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use("/api/reservation", require("./routes/reservation"));
app.use("/api/user", require("./routes/user"));
app.use("/api/dish", require("./routes/dish"));

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Route Swagger UI
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000; // Si tu n'as pas de variable d'environnement PORT, il écoute sur le port 3000

app.listen(port, () => {
  console.log(`Serveur en ligne sur le port ${port}`);
});

module.exports = app;
