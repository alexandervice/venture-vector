const Trip = require("../models/trip.model");

const createTrip = (req, res) => {
    Trip.create(req.body)
        .then(newTrip => {
            res.json({ newTrip });
        })
        .catch((err) => {
            res.status(400).json({ errors: err.errors });
        });
};

const getTripsByUser = (req, res) => {
    Trip.find({ user: req.user._id })
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

module.exports = { createTrip, getTripsByUser, getTripById, updateTrip, deleteTrip };
