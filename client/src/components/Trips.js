import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const Trips = ({ user, show }) => {
    const [trips, setTrips] = useState([]);
    const userO = JSON.parse(localStorage.getItem("usertoken"))
    console.log("userO:", userO);

    useEffect(() => {
        console.log("user in trips.js", user);
        if (user && userO) {
            axios.get(`${process.env.REACT_APP_API_URL}/api/trips/${userO._id}`, { withCredentials: true })
                .then(res => {
                    console.log('res data in trips.js:', res.data);
                    setTrips(res.data || []);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [user, userO?._id]);


    const updateTrip = (id, updatedTrip) => {
        axios
            .patch(`${process.env.REACT_APP_API_URL}/api/trips/${id}`, updatedTrip, { withCredentials: true })
            .then(response => {
                const updatedTrips = trips.map(trip => trip._id === id ? response.data : trip);
                setTrips(updatedTrips);
                console.log('Trip updated:', response.data);

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const deleteTrip = (id) => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/api/trips/${id}`, { withCredentials: true })
            .then(response => {
                const remainingTrips = trips.filter(trip => trip._id !== id);
                setTrips(remainingTrips);
                console.log('Trip deleted:', response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className={`dropdown ${show ? 'show' : ''}`}>
            <table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Traveler Number</th>
                        <th>Budget</th>
                        <th>Hotel</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trips && trips.map((trip) => (
                        <tr key={trip.location}>
                            <td>{trip.location}</td>
                            <td>{trip.startDate}</td>
                            <td>{trip.endDate}</td>
                            <td>{trip.travelerNumber} person</td>
                            <td>${trip.budget}</td>
                            <td>{trip.hotel.name}</td>
                            <td>
                                <button onClick={() => updateTrip(trip._id, updateTrip)}>Edit</button> |
                                <button onClick={() => deleteTrip(trip._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Trips;