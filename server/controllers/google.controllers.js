const apiKey = process.env.GOOGLE_MAPS_API_KEY

module.exports = {
  findPlaceId: async (req, res) => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json', {
        params: {
          key: apiKey,
          input: req.query.term,
          inputtype: 'textquery',
          fields: 'place_id',
        },
      });
  
      res.send(response.data);
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong.' });
    }
  }
}