const apiKey = process.env.GOOGLE_MAPS_API_KEY
const axios = require("axios");

module.exports = {
  findOnePlaceId: async (req, res) => {
    try {
      // console.log(req.body.nameAddress)
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json', {
        params: {
          key: apiKey,
          input: req.body.nameAddress,
          inputtype: 'textquery',
          fields: 'place_id',
        },
      });
      // console.log("Google Place Search has responded")
      res.status(200).send({place_id : response.data.candidates[0].place_id});
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: error });
    }
  },

  findOnePlaceDetails: async (req, res) => {
    try {
      // console.log(req.body.placeId)
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
        params: {
          key: apiKey,
          place_id: req.body.placeId,
          fields: 'name,rating,formatted_address,geometry,photo,editorial_summary,price_level,type',
        },
      });
      // console.log("Google Place Details has responded")
      res.status(200).send({details : response.data.result});
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong.' });
    }
  },

  findOnePlacePhoto: async (req,res) => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/photo/json', {
        params: {
          key: apiKey,
          place_id: req.body.photo_reference,
          maxwidth: 400 // the size photo we want to recieve
        },
      });
  
      console.log("Google Place Pictures has responded")
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong.' });
    }
  }
}