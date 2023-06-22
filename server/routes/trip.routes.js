const tripController = require('../controllers/trip.controllers');

module.exports = (app) => {
    app.post("/api/trips", tripController.createTrip);
    app.get("/api/trips", tripController.getTripsByUser);
    app.get("/api/trips/:id", tripController.getTripById);
    app.put("/api/trips/:id", tripController.updateTrip);
    app.delete("/api/trips/:id", tripController.deleteTrip);

};