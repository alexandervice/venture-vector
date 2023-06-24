import React, { useState } from 'react';
import { Element } from 'react-scroll';

const Search = () => {
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [travelerNumber, setTravelerNumber] = useState(1);
    const [budget, setBudget] = useState(3);

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
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </label>

                    <label>
                        Start Date:
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </label>

                    <label>
                        End Date:
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>

                    <label>
                        Traveler Number:
                        <input
                            type="number"
                            value={travelerNumber}
                            onChange={(e) => setTravelerNumber(parseInt(e.target.value))}
                        />
                    </label>

                    <label>
                        Budget:
                        <input
                            type="range"
                            min={0}
                            max={5}
                            value={budget}
                            onChange={(e) => setBudget(parseInt(e.target.value))}
                        />
                    </label>

                    <button type="submit">Submit</button>
                </form>


            </div>


        </Element>
    )
}

export default Search;