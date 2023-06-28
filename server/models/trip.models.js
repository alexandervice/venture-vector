const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
    name: String,
    description: String,
    address: String,
    placeId: String,
    mapLocation: {
        latitude: Number,
        longitude: Number
    },
    price: Number, // 1 through 5, with 1 = "$" and 5 = "$$$$$"
    rating: Number,
    photos: Array // this will just have a reference to a photo and we will need to perform an api call to get the actual pictures on the front-end
})

const TripSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    location: {
        type: String,
        required: [true, "City is required"],
    },
    startDate: {
        type: Date,
        required: [true, "Start Date is required"],
    },
    endDate: {
        type: Date,
        required: [true, "End Date is required"],
    },
    travelerNumber: {
        type: Number,
        required: [true, "Number of travelers is required"],
    },
    budget: {
        type: Number,
        required: true,
    },

    itinerary: {
        type: String,
    },
    reason: {
        type: String,
    },
    extras: {
        type: String,
    },

    city: PlaceSchema,
    hotel: PlaceSchema,
    restaurants: [PlaceSchema],
    otherPlaces: [PlaceSchema]
}, { timestamps: true });

module.exports = mongoose.model("Trip", TripSchema);
