const tripController = require('../controllers/trip.controllers');
const {authenticate} = require('../config/jwt.config');


module.exports = (app) => {
    app.post("/api/trips", authenticate, tripController.createTrip);
    app.get("/api/trips/user", authenticate, tripController.getTripsByUser);
    app.get("/api/trips/:id", authenticate, tripController.getTripById);
    app.patch("/api/trips/:id", authenticate, tripController.updateTrip);
    app.delete("/api/trips/:id", authenticate, tripController.deleteTrip);

};