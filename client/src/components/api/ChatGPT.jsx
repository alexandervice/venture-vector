import React, {useState} from 'react'
import axios from 'axios';

const ChatGPT = (props) => {
  const {tripData, setTripData} = props
  const [loading, setLoading] = useState(false);
  const [messageReceived, setMessageReceieved] = useState(false);

  const messageData = `Create an itinerary for a trip to: (${tripData.location}) from the dates of: (${tripData.dateStart} - ${tripData.dateEnd}) for ${tripData.travelerNumber} travelers, and a hotel price that is: ${tripData.budget} a food price that is: ${tripData.budget}. Please give ideas of things to do and places to see. Please export this as a JSON with the places written in a way the google places API can search them {itineraryDescription: (describe lots of fun things to do or places to see), hotel: {name:, address:}, restaurants: [{name:, address: }] places: [{name:, address: }]}`
  
  const sendMessageToChatGPT = async () => {
    try {
      setLoading(true);
      // make sure to create a .env file and set:
      // REACT_APP_API_URL = "http://localhost:8000"
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/chat`, messageData, {withCredentials: true});

      // Handle the response from the backend, such as displaying the result in the UI
      // console.log(response.data.text)

      // Reformat this code to bring in the google API functions and pull all the info from one function. Split it up by thing (hotels, restaurants, otherPlaces). Start by getting the place_id, then find the place details (Basic Data, Atmosphere Data, and Photo). Then append all of that in the setTripData

      const chatGPTResponse = JSON.parse(response.data.text);
      setTripData({ ...tripData, 
        itinerary: chatGPTResponse.itineraryDescription, 
        hotel: {
          name: chatGPTResponse.hotel.name,
          address: chatGPTResponse.hotel.address
        }, 
        restaurants: chatGPTResponse.restaurants.map(restaurant => ({
          ...restaurant,
          name: restaurant.name, // Add the restaurant name property
          address: restaurant.address // Add the restaurant address property
        })),
        otherPlaces: chatGPTResponse.places.map(place => ({
          ...place,
          name: place.name, // Add the place name property
          address: place.address // Add the place address property
        }))
      })
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
        <button type='button' onClick={() => sendMessageToChatGPT()}>Create Itinerary</button>
        }
      </div>
      }
    </div>
  )
}

export default ChatGPT