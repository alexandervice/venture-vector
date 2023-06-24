import React, { useState } from 'react';
import { Element } from 'react-scroll';
import ChatGPT from '../api/ChatGPT';

const Search = () => {
    // const [location, setLocation] = useState('');
    // const [startDate, setStartDate] = useState('');
    // const [endDate, setEndDate] = useState('');
    // const [travelerNumber, setTravelerNumber] = useState(1);
    // const [budget, setBudget] = useState(3);
    const [tripData, setTripData] = useState({
      location: "",
      startDate: "",
      endDate: "",
      travelerNumber: 1,
      budget: 3
  })
    console.log(tripData)
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
                            onChange={(e) => setTripData({...tripData, location: e.target.value})}
                        />
                    </label>

                    <label>
                        Start Date:
                        <input
                            type="date"
                            value={tripData.startDate}
                            onChange={(e) => setTripData({...tripData, startDate: e.target.value})}
                        />
                    </label>

                    <label>
                        End Date:
                        <input
                            type="date"
                            value={tripData.endDate}
                            onChange={(e) => setTripData({...tripData, endDate: e.target.value})}
                        />
                    </label>

                    <label>
                        Traveler Number:
                        <input
                            type="number"
                            value={tripData.travelerNumber}
                            onChange={(e) => setTripData({...tripData, travelerNumber: e.target.value})}
                        />
                    </label>

                    <label>
                        Budget:
                        <input
                            type="range"
                            min={0}
                            max={5}
                            value={tripData.budget}
                            onChange={(e) => setTripData({...tripData, budget: e.target.value})}
                        />
                    </label>
                    <ChatGPT tripData={tripData} setTripData={setTripData}/>
                    <button type="submit">Submit</button>
                </form>


            </div>


        </Element>
    )
}

export default Search;