const mongoose = require("mongoose");

const PlaceSchema =new mongoose.Schema({
  name: Text,
  description: Text,
  address: Text,
  placeId: Text,
  mapLocation : [{
    latitude: Number,
    longitude: Number
  }],
  price: Number, // 1 through 5, with 1 = "$" and 5 = "$$$$$"
  rating: Number,
  photos: Array
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