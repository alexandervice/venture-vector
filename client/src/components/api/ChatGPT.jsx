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
      const chatGPTResponse = JSON.parse(response.data.text);
      setTripData({ ...tripData, itinerary: chatGPTResponse.itineraryDescription, hotel: chatGPTResponse.hotel, restaurants: chatGPTResponse.restaurants, otherPlaces: chatGPTResponse.places });
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