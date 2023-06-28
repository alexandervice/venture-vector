import axios from 'axios';

export const getOnePlaceId = async (nameAddress) => {
  try {
    // make sure to create a .env file and set:
    // REACT_APP_API_URL = "http://localhost:8000"
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/places/search`, { nameAddress });

    const placeId = response.data.place_id;
    // console.log(placeId)
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
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/places/details`, { placeId }, { withCredentials: true });

    const placeDetails = {
      details: response.data.details,
      photos: []
    };
    // console.log(placeDetails)

    if (placeDetails.details.photos) {
      placeDetails.photos = placeDetails.details.photos.map(photo => ({
        photo_reference: photo.photo_reference,
      }))
    }
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
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/places/photo`, { photo_reference }, { withCredentials: true });

    return response
  } catch (error) {
    // Handle errors, such as displaying an error message to the user
    console.error(error);
    return (
      <p>Photo Reference: {photo_reference}</p>
    )
  }
};



