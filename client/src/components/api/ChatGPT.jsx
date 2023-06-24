import React, {useState} from 'react'
import {getOnePlaceId, getPlaceDetails} from './Google';
import axios from 'axios';

const ChatGPT = (props) => {
  const {tripData, setTripData} = props
  const [loading, setLoading] = useState(false);
  const [messageReceived, setMessageReceieved] = useState(false);

  const messageData = {"message" : `Create an itinerary for a trip to: (${tripData.location}) from the dates of: (${tripData.startDate} - ${tripData.endDate}) for ${tripData.travelerNumber} travelers, and a trip budget that is: ${tripData.budget} $ out of 5 $. Please give ideas of things to do and places to see. Please export this as a JSON with the places written in a way the google places API can search them.. {itineraryDescription: '(Please write out as a paragraph what the traveler should do on their trip)', hotel: {name: '', address: ''}, restaurants: [{name: '', address: '' }] places: [{name: '', address: ''}]}`}
  
  const chatgptWithGoogleResponse = async () => {
    try {
      setLoading(true);
      // make sure to create a .env file and set:
      // REACT_APP_API_URL = "http://localhost:8000"
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/chat`, messageData, {withCredentials: true});

      if(!JSON.parse(response.data.text)) {
        throw new Error('Invalid response data');
      }
      const chatGPTResponse = JSON.parse(response.data.text);
      // console.log(chatGPTResponse.itineraryDescription)
      setTripData({ ...tripData, itinerary: chatGPTResponse.itineraryDescription})
      // Reformat this code to bring in the google API functions and pull all the info from one function. Split it up by thing (hotels, restaurants, otherPlaces). Start by getting the place_id, then find the place details (Basic Data, Atmosphere Data, and Photo). Then append all of that in the setTripData

      // hotel
      const hotelId = await getOnePlaceId(`${chatGPTResponse.hotel.name}, ${chatGPTResponse.hotel.address}`)
      if(!hotelId) {
        throw new Error('Google API Failure');
      }
      const hotelDetails = await getPlaceDetails(hotelId)
      setTripData({ ...tripData, 
        hotel: {
          name: hotelDetails.details.name,
          description: hotelDetails.details.editorial_summary.overview,
          address: hotelDetails.details.formatted_address,
          placeId: hotelId,
          mapLocation: {
            latitude: hotelDetails.details.geometry.location.lat,
            longitude: hotelDetails.details.geometry.location.lng
          },
          price: hotelDetails.details.price_level,
          rating: hotelDetails.details.rating,
          photos: hotelDetails.photos
        }
      })
      // --------------------------------------------------------------------------------
      // restaurants
      const restaurantDetailsPromises = chatGPTResponse.restaurants.map(async (restaurant) => {
        const restaurantId = await getOnePlaceId(`${restaurant.name}, ${restaurant.address}`);
        const restaurantDetails = await getPlaceDetails(restaurantId);
        return {
          name: restaurantDetails.details.name,
          description: restaurantDetails.details.editorial_summary.overview,
          address: restaurantDetails.details.formatted_address,
          placeId: restaurantId,
          mapLocation: {
            latitude: restaurantDetails.details.geometry.location.lat,
            longitude: restaurantDetails.details.geometry.location.lng,
          },
          price: restaurantDetails.details.price_level,
          rating: restaurantDetails.details.rating,
          photos: restaurantDetails.photos,
        };
      });
      
      const restaurantDetails = await Promise.all(restaurantDetailsPromises);
      
      setTripData({
        ...tripData,
        restaurants: restaurantDetails,
      });
      // --------------------------------------------------------------------------------
      // Other Places
      const otherPlaceDetailsPromises = chatGPTResponse.otherPlaces.map(async (place) => {
        const placeId = await getOnePlaceId(`${place.name}, ${place.address}`);
        const placeDetails = await getPlaceDetails(placeId);
        return {
          name: placeDetails.details.name,
          description: placeDetails.details.editorial_summary.overview,
          address: placeDetails.details.formatted_address,
          placeId: placeId,
          mapLocation: {
            latitude: placeDetails.details.geometry.location.lat,
            longitude: placeDetails.details.geometry.location.lng,
          },
          price: placeDetails.details.price_level,
          rating: placeDetails.details.rating,
          photos: placeDetails.photos,
        };
      });
      
      const otherPlaceDetails = await Promise.all(otherPlaceDetailsPromises);
      
      setTripData({
        ...tripData,
        otherPlaces: otherPlaceDetails,
      });
      // --------------------------------------------------------------------------------

      setLoading(false);
      setMessageReceieved(true);
    } catch (error) {
      // Handle errors, such as displaying an error message to the user
      console.error(error);
      setLoading(false);
      setMessageReceieved(false);
    }
  };
  
  return (
    <div>
      {loading?
      <div>
        please wait
      </div> :
      <div>
        {messageReceived ?
        <button disabled type='button'></button> :
        <button type='button' onClick={() => chatgptWithGoogleResponse()}>Plan My Trip</button>
        }
      </div>
      }
    </div>
  )
}

export default ChatGPT