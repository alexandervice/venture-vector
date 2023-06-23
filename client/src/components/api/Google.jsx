import {useState} from 'react'
import axios from 'axios';

const Google = (props) => {
  const {tripData, setTripData} = props
  const [loading, setLoading] = useState(false);
  const [messageReceived, setMessageReceieved] = useState(false);
  

  const getPlaceIds = async () => {
    setLoading(true);
    const query = [tripData.hotel.address]
    for(let i=0;i<tripData.restaurants.length; i++) {

    }
    const getOnePlaceId = async (address) => {
      try {
        // make sure to create a .env file and set:
        // REACT_APP_API_URL = "http://localhost:8000"
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/places/search`, address);
  
        // Handle the response from the backend, such as displaying the result in the UI
        // console.log(response.data.text)
        const placeId = response.data;
        setTripData({ ...tripData, itinerary: chatGPTResponse.itineraryDescription, hotel: chatGPTResponse.hotel, restaurants: chatGPTResponse.restaurants, otherPlaces: chatGPTResponse.places });
        setLoading(false);
        setMessageReceieved(true);
      } catch (error) {
        // Handle errors, such as displaying an error message to the user
        console.error(error);
        setLoading(false);
        setMessageReceieved(false);
      }
    }
  };
}

export default Google