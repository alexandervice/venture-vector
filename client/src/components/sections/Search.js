import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import ChatGPT from '../api/ChatGPT';
import axios from 'axios';

const Search = ({ tripData, setTripData }) => {
    const user = JSON.parse(localStorage.getItem("usertoken"))
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/api/trips`, { tripData }, { withCredentials: true })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
                const errorResponse = err.response.data.errors;
                const errorArray = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArray.push(errorResponse[key].message)
                }
                setErrors(errorArray)
                console.log(errors)
            })
            .catch(err => {
                console.error('An error occurred while fetching place details or creating the trip:', err);
            });
    }

    return (
        <Element className='section search' name='search'>
            <div>

                <h2 id='search'>Search page</h2>

                <form onSubmit={handleSubmit}>
                    <label>
                        Location:
                        <input
                            type="text"
                            value={tripData.location}
                            onChange={(e) => setTripData({ ...tripData, location: e.target.value })}
                        />
                    </label>

                    <label>
                        Start Date:
                        <input
                            type="date"
                            value={tripData.startDate}
                            onChange={(e) => setTripData({ ...tripData, startDate: e.target.value })}
                        />
                    </label>

                    <label>
                        End Date:
                        <input
                            type="date"
                            value={tripData.endDate}
                            onChange={(e) => setTripData({ ...tripData, endDate: e.target.value })}
                        />
                    </label>

                    <label>
                        Traveler Number:
                        <input
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
                    <button className="bg-green-200 hover:bg-green-300 rounded px-1 border-solid border-2 border-green-400 dark:bg-green-800 dark:hover:bg-green-700" type="submit">Save Trip</button>
                </form>


            </div>


        </Element>
    )
}

export default Search;