const GoogleController = require("../controllers/google.controllers");
// const {authenticate} = require('../config/jwt.config');

module.exports = app => {
  app.post("/places/search", GoogleController.findOnePlaceId);
  app.post("/places/details", GoogleController.findOnePlaceDetails);
  app.post("/places/photo", GoogleController.findOnePlacePhoto);
}