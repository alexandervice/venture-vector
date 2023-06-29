import React, {useState} from 'react'
import {getOnePlaceId, getPlaceDetails} from './Google';
import axios from 'axios';

const ChatGPT = (props) => {
  const {tripData, setTripData, loading, setLoading} = props
  const [messageReceived, setMessageReceieved] = useState(false);

  const messageData = {"message" : `Create an itinerary for a trip to: (${tripData.location}) from the dates of: (${tripData.startDate} - ${tripData.endDate}) for ${tripData.travelerNumber} travelers, and a trip budget that is: ${tripData.budget} $ out of 5 $. Please give ideas of things to do and places to see. Please export this as a JSON with the places written in a way the google places API can search them.. {itineraryDescription: '(Please write out as a paragraph what the traveler should do on their trip)', hotel: {name: '', address: ''}, restaurants: [{name: '', address: '' }] places: [{name: '', address: ''}]}`}
  
  const chatgptWithGoogleResponse = async () => {
    try {
      setLoading(true);
      // make sure to create a .env file and set:
      // REACT_APP_API_URL = "http://localhost:8000"
      
      // City
      const cityId = await getOnePlaceId(tripData.location)
      if(!cityId) {
        throw new Error('Invalid City');
      }
      const cityDetails = await getPlaceDetails(cityId)
      if(!cityDetails) {
        throw new Error('Google API Failure');
      }
      setTripData(prevState => ({
        ...prevState, 
        city: {
          name: cityDetails.details.name,
          placeId: cityId,
          mapLocation: {
            latitude: cityDetails.details.geometry.location.lat,
            longitude: cityDetails.details.geometry.location.lng
          },
          photos: cityDetails.photos
        }
      }));


      const response = await axios.post(`${process.env.REACT_APP_API_URL}/chat`, messageData, {withCredentials: true});

      // if(!JSON.parse(response.data.text)) {
      //   throw new Error('Invalid response data');
      // }
      const chatGPTResponse = JSON.parse(response.data.text);
      console.log("Chat GPT has responded: ",chatGPTResponse)
      setTripData(prevState => ({
        ...prevState,
        itinerary: chatGPTResponse.itineraryDescription,
      }));
      // console.log("itinerary complete",tripData)
      


      // hotel
      const hotelId = await getOnePlaceId(`${chatGPTResponse.hotel.name}, ${chatGPTResponse.hotel.address}`)
      if(!hotelId) {
        throw new Error('Cannot Find Hotel');
      }
      const hotelDetails = await getPlaceDetails(hotelId)
      if(!hotelDetails) {
        throw new Error('Google API Failure');
      }
      const hotelDescription = hotelDetails.details.editorial_summary?.overview || '';
      setTripData(prevState => ({
        ...prevState, 
        hotel: {
          name: hotelDetails.details.name,
          description: hotelDescription,
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
      }));
      // console.log("hotel complete",tripData)
      // --------------------------------------------------------------------------------
      // restaurants
      const restaurantDetailsPromises = chatGPTResponse.restaurants.map(async (restaurant) => {
        try {
          const restaurantId = await getOnePlaceId(`${restaurant.name}, ${restaurant.address}`);
          const restaurantDetails = await getPlaceDetails(restaurantId);
          const restaurantDescription = restaurantDetails.details.editorial_summary?.overview || '';
          return {
            name: restaurantDetails.details.name,
            description: restaurantDescription,
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
        } catch (error) {
          console.error(`Error retrieving details for restaurant: ${restaurant.name}`);
          return null; // or handle the error in a way that suits your application
        }
      });
      
      const restaurantDetails = await Promise.all(restaurantDetailsPromises);
      
      // Filter out any null values in the restaurantDetails array
      const filteredRestaurantDetails = restaurantDetails.filter(restaurant => restaurant !== null);
      
      setTripData(prevState => ({
        ...prevState,
        restaurants: filteredRestaurantDetails,
      }));
      // console.log("restaurants complete",tripData)
      // --------------------------------------------------------------------------------
      // Other Places
      const otherPlaceDetailsPromises = chatGPTResponse.places.map(async (place) => {
        try {
          const placeId = await getOnePlaceId(`${place.name}, ${place.address}`);
          const placeDetails = await getPlaceDetails(placeId);
          const placeDescription = placeDetails.details.editorial_summary?.overview || '';
          return {
            name: placeDetails.details.name,
            description: placeDescription,
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
        } catch (error) {
          console.error(`Error retrieving details for place: ${place.name}`);
          return null; // or handle the error in a way that suits your application
        }
      });
      
      const otherPlaceDetails = await Promise.all(otherPlaceDetailsPromises);
      
      // Filter out any null values in the otherPlaceDetails array
      const filteredOtherPlaceDetails = otherPlaceDetails.filter(place => place !== null);
      
      setTripData(prevState => ({
        ...prevState,
        otherPlaces: filteredOtherPlaceDetails,
      }));
      // console.log("otherPlaces complete",tripData)
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
        <button className='bg-yellow-200 hover:bg-yellow-300 rounded px-3 border-solid border-2 border-yellow-400 dark:text-black dark:hover:bg-yellow-200 dark:bg-yellow-300 dark:border-yellow-400 text-2xl' type='button' onClick={() => chatgptWithGoogleResponse()}>Plan My Trip</button>
        }
      </div>
      }
    </div>
  )
}

export default ChatGPT