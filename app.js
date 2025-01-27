const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.js");
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

mongoose
  .connect(
    "mongodb+srv://luca:HHlCDyIQSVlhPb0d@cluster0.ldok2.mongodb.net/signature?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

module.exports = app;
