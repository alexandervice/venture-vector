import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const Trips = ({ user, show }) => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`${process.env.REACT_APP_API_URL}/api/trips/user`, { withCredentials: true })
                .then(res => {
                    setTrips(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [user]);

    function updateTrip(id, updatedTrip) {
        fetch(`/api/trips/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTrip)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Trip updated:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function deleteTrip(id) {
        fetch(`/api/trips/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Trip deleted:', data);
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
                        <th>Address</th>
                        <th>Start Date</th>
                        <th>Duration</th>
                        <th>Traveler Number</th>
                        <th>Budget</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map(({ location, startDate, endDate, travelerNumber, budget }) => (
                        <tr key={location}>
                            <td>{location}</td>
                            <td>{startDate}</td>
                            <td>{dayjs(endDate).diff(startDate, 'day')} days</td>
                            <td>{travelerNumber} person</td>
                            <td>${budget}</td>
                            <td>Edit | Delete</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Trips;