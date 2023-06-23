const GoogleController = require("../controllers/google.controllers");
const {authenticate} = require('../config/jwt.config');

module.exports = app => {
  app.get("/places/search", authenticate, GoogleController.findOnePlaceId);
  app.get("/places/details", authenticate, GoogleController.findOnePlaceDetails);
  app.get("/places/photo", authenticate, GoogleController.findOnePlacePhoto);
}