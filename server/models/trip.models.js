const mongoose = require("mongoose");

const PlaceSchema =new mongoose.Schema({
  name: Text,
  description: Text,
  address: Text,
  placeId: Text,
  mapLocation : [{
    latitude: String,
    longitude: String
  }],
  price: String, // this can either be "$$$" or 3 ~ meaning we can have this as either a String or a Number
  rating: Number
})

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
    itinerary: {
        type: String,
    },
    hotel: PlaceSchema,
    restaurants : [PlaceSchema],
    otherPlaces : [PlaceSchema]
}, { timestamps: true });

module.exports = mongoose.model("Trip", TripSchema);