const Trip = require("../models/trip.models");

const createTrip = (req, res) => {
    console.log("createTrip req.body:", req.body);
    Trip.create(req.body.tripData)
        .then(newTrip => {
            res.json({ newTrip });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ errors: err.errors });
        });
};

const getAllTrips = (req, res) => {
    Trip.find().sort({ startDate: 1 })
        .then((allTrips) => {
            res.json(allTrips);
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

const getTripsByUser = (req, res) => {
    // console.log("req.userId in getTripsByUser", req.userId);
    Trip.find({ user: req.userId }).sort({ startDate: 1 })
        .then((allTrips) => {
            res.json(allTrips);
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

const getTripById = (req, res) => {
    Trip.findOne({ _id: req.params.id })
        .then(oneTrip => res.json(oneTrip))
        .catch((err) =>
            res.status(400).json(err));
};

const updateTrip = (req, res) => {
    Trip.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updatedTrip => res.json(updatedTrip))
        .catch((err) =>
            res.status(400).json(err));
}

const deleteTrip = (req, res) => {
    Trip.deleteOne({ _id: req.params.id })
        .then(delTrip => res.json(delTrip))
        .catch((err) =>
            res.status(400).json(err));
}

module.exports = { createTrip, getAllTrips, getTripsByUser, getTripById, updateTrip, deleteTrip };
