import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import ChatGPT from '../api/ChatGPT';
import axios from 'axios';

const Search = ({ tripData, setTripData }) => {
    const user = JSON.parse(localStorage.getItem("usertoken"))
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post(`${process.env.REACT_APP_API_URL}/api/trips`, {tripData}, {withCredentials: true})
            .then(res=>{
              console.log(res);
            })
            .catch(err=> {
              console.log(err)
              const errorResponse = err.response.data.errors;
              const errorArray = [];
              for (const key of Object.keys(errorResponse)) {
                errorArray.push(errorResponse[key].message)
              }
              setErrors(errorArray)
              console.log(errors)
            })
        // Nandor, I am not sure what the code below this does (from Alex)
        // // First, we get the Place ID from Google API
        // axios.get(`${process.env.REACT_APP_API_URL}/api/google/findPlaceId`, {
        //     params: {
        //         nameAddress: tripData.location,
        //     }
        // })
        //     .then(res => {
        //         const placeId = res.data.place_id;
        //         console.log('Place ID:', placeId);

        //         // Second, we use the Place ID to get the Place Details from Google API
        //         return axios.get(`${process.env.REACT_APP_API_URL}/api/google/findPlaceDetails`, {
        //             params: {
        //                 placeId: placeId,
        //             }
        //         });
        //     })
        //     .then(res => {
        //         const placeDetails = res.data.details;
        //         console.log('Place Details:', placeDetails);

        //         // We add the data from the Google API to our trip data
        //         const updatedTripData = {
        //             ...tripData,
        //             city: placeDetails.city, // assume these fields exist in placeDetails
        //             hotel: placeDetails.hotel,
        //             restaurants: placeDetails.restaurants,
        //             otherPlaces: placeDetails.otherPlaces
        //         };
        //         console.log('Updated Trip Data:', updatedTripData);
        //         // Finally, we send the updated trip data to our server to save in the database
        //         return axios.post(`${process.env.REACT_APP_API_URL}/api/trips`, updatedTripData, { withCredentials: true });
        //     })
        //     .then(res => {
        //         console.log('New trip created:', res.data.newTrip);
        //     })
        //     .catch(err => {
        //         console.error('An error occurred while fetching place details or creating the trip:', err);
        //     });
    }

    return (
        <Element className='section search ' name='search'>
            <div>

                <h2 id='search'>Search page</h2>

                <form onSubmit={handleSubmit}>
                    <label>
                        Location:
                        <input
                            className='dark:text-black'
                            type="text"
                            value={tripData.location}
                            onChange={(e) => setTripData({ ...tripData, location: e.target.value, user: user })}
                        />
                    </label>

                    <label>
                        Start Date:
                        <input
                            className='dark:text-black'
                            type="date"
                            value={tripData.startDate}
                            onChange={(e) => setTripData({ ...tripData, startDate: e.target.value })}
                        />
                    </label>

                    <label>
                        End Date:
                        <input
                            className='dark:text-black'
                            type="date"
                            value={tripData.endDate}
                            onChange={(e) => setTripData({ ...tripData, endDate: e.target.value })}
                        />
                    </label>

                    <label>
                        Traveler Number:
                        <input
                            className='dark:text-black'
                            type="number"
                            min={1}
                            max={5}
                            value={tripData.travelerNumber}
                            onChange={(e) => setTripData({ ...tripData, travelerNumber: e.target.value })}
                        />
                    </label>

                    <label>
                        Budget:
                        <input
                            type="range"
                            min={1}
                            max={5}
                            value={tripData.budget}
                            onChange={(e) => setTripData({ ...tripData, budget: e.target.value })}
                        />
                    </label>
                    <ChatGPT tripData={tripData} setTripData={setTripData} />
                    <button className="bg-green-200 hover:bg-green-300 rounded px-1 border-solid border-2 border-green-400 dark:bg-green-800 dark:hover:bg-green-700" type="submit">Submit</button>
                </form>


            </div>


        </Element>
    )
}

export default Search;