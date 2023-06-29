import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import ChatGPT from '../api/ChatGPT';
import axios from 'axios';
import AsyncSelect from 'react-select/async';// import cities from 'cities.json';
import StarRatings from 'react-star-ratings'; //select Budget with symbol

const Search = ({ tripData, setTripData }) => {
  const user = JSON.parse(localStorage.getItem("usertoken"))
  const [errors, setErrors] = useState([]);
  const [dateError, setDateError] = useState(null);
  const [loading, setLoading] = useState(false)

  const checkDates = () => {
    if (tripData.startDate && tripData.endDate) {
      if (new Date(tripData.startDate) >= new Date(tripData.endDate)) {
        setDateError('End Date MUST be after Start Date');
      } else {
        setDateError(null);
      }
    }
  };

  useEffect(() => {
    checkDates();
  }, [tripData.startDate, tripData.endDate]);


  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}/api/trips`, { tripData }, { withCredentials: true })
      .then(res => {
        setTripData(
          {
            location: "",
            startDate: "",
            endDate: "",
            travelerNumber: 1,
            budget: 3,
            itinerary: "",
            city: {},
            hotel: {},
            restaurants: [],
            otherPlaces: []
          }
        )

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
  }

  const isFormValid = (tripData) => {
    return tripData.location && tripData.startDate && tripData.endDate && tripData.travelerNumber && tripData.budget;
  }

  const loadOptions = (inputValue, callback) => {
    axios.get(`https://api.api-ninjas.com/v1/city?name=${inputValue}`, { headers: { 'X-Api-Key': 'vWJbw/eyszMNw5WOX3huCQ==gNII8pAuZxnwQ53x' } })
      .then(res => {
        const options = res.data.map(city => ({
          value: city.name,
          label: city.name,
        }));
        callback(options);
      });
  };


  return (
    <Element className='section search my-5 mt-8' name='search' style={{ height: '60vh' }}>
      <div className='p-5 bg-zinc-600/50 flex max-w-7xl flex-col' >
        <h2 id='search' className="text-2xl font-medium text-yellow-300 mb-7">Start Your Search:</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Location:
            <AsyncSelect
              required
              cacheOptions
              className='dark:text-black'
              loadOptions={loadOptions}
              getOptionValue={option => option.value}
              getOptionLabel={option => option.label}
              onChange={selectedOption => setTripData({ ...tripData, location: selectedOption ? selectedOption.value : '', user: user })}
            />
          </label>

          <label>
            Start Date:
            <input
              required
              className='dark:text-black'
              type="date"
              value={tripData.startDate}
              onChange={(e) => {
                setTripData({ ...tripData, startDate: e.target.value });
              }}
            />
          </label>

          <label>
            End Date:
            <input
              required
              className='dark:text-black'
              type="date"
              value={tripData.endDate}
              onChange={(e) => {
                setTripData({ ...tripData, endDate: e.target.value });
              }}
            />
          </label>

          <label>
            Traveler Number:
            <input
              required
              className='dark:text-black'
              type="number"
              min={1}
              max={5}
              value={tripData.travelerNumber}
              onChange={(e) => setTripData({ ...tripData, travelerNumber: e.target.value })}
            />
          </label>

          <p>Select Budget:</p>
          <StarRatings
            rating={tripData.budget}
            starRatedColor="yellow"
            numberOfStars={5}
            name='rating'
            starDimension="40px"
            starSpacing="15px"
            changeRating={(value) => setTripData({ ...tripData, budget: value })}
          />

          {dateError && <div className="error text-red-400">{dateError}</div>}
          {!user && <div className="error text-red-400">Must be Signed In</div>}
          {isFormValid(tripData) && !dateError && <ChatGPT tripData={tripData} setTripData={setTripData} setLoading={setLoading} loading={loading} />}
          {user && isFormValid(tripData) && !dateError && !loading ?
            <button className="bg-green-200 hover:bg-green-300 rounded px-1 border-solid border-2 border-green-400 dark:bg-green-800 dark:hover:bg-green-700" type="submit">Save Trip</button>
            : ""
          }

        </form>

      </div>


    </Element>
  )
}

export default Search;