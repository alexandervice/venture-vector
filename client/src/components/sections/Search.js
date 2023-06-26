import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import ChatGPT from '../api/ChatGPT';

const Search = ({ tripData, setTripData }) => {
    // const [location, setLocation] = useState('');
    // const [startDate, setStartDate] = useState('');
    // const [endDate, setEndDate] = useState('');
    // const [travelerNumber, setTravelerNumber] = useState(1);
    // const [budget, setBudget] = useState(3);



    // const [tripData, setTripData] = useState({
    //     location: "",
    //     startDate: "",
    //     endDate: "",
    //     travelerNumber: 1,
    //     budget: 3,
    //     itinerary: "",
    //     city: {},
    //     hotel: {},
    //     restaurants: [],
    //     otherPlaces: []
    // })

    // This useEffect can be deleted once we have the trips. It is just to check with a console log if the API's worked
    // useEffect(() => {
    //     console.log("Updated", tripData);
    // }, [tripData.otherPlaces]);


    const handleSubmit = (e) => {
        e.preventDefault();
        // SUBMIT 
        // OR DO SOMETHING
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
                    <button className="bg-green-200 hover:bg-green-300 rounded px-1 border-solid border-2 border-green-400 dark:bg-green-800 dark:hover:bg-green-700" type="submit">Submit</button>
                </form>


            </div>


        </Element>
    )
}

export default Search;