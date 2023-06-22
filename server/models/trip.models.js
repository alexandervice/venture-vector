const mongoose = require("mongoose");

const TripSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dateStart: {
        type: Date,
        required: true,
    },
    dateEnd: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
    },
    extras: {
        type: Array,
    },
}, { timestamps: true });

module.exports = mongoose.model("Trip", TripSchema);