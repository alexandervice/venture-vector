import axios from 'axios';

  export const getOnePlaceId = async (nameAddress) => {
    try {
      // make sure to create a .env file and set:
      // REACT_APP_API_URL = "http://localhost:8000"
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/places/search`, nameAddress);

      // console.log(response)
      const placeId = response.place_id;
      return placeId
    } catch (error) {
      // Handle errors, such as displaying an error message to the user
      console.error(error);
    }
  };

  export const getPlaceDetails = async (placeId) => {
    try {
      // make sure to create a .env file and set:
      // REACT_APP_API_URL = "http://localhost:8000"
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/places/details`, placeId);

      // console.log(response)
      const placeDetails = {
        details: response.details,
        photos: []
      };
      placeDetails.photos = placeDetails.details.photos.map(photo => ({
        photo_reference: photo.photo_reference,
      }))
      return placeDetails
    } catch (error) {
      // Handle errors, such as displaying an error message to the user
      console.error(error);
    }
  };

  export const getPlacePhoto = async (photo_reference) => {
    try {
      // make sure to create a .env file and set:
      // REACT_APP_API_URL = "http://localhost:8000"
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/places/photo`, photo_reference);

      return response
    } catch (error) {
      // Handle errors, such as displaying an error message to the user
      console.error(error);
    }
  };



