import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import MoreDetails from './sections/MoreDetails';

const Trips = ({ user, show }) => {
    const [trips, setTrips] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [updatedTrip, setUpdatedTrip] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [detailsView, setDetailsView] = useState(false); //More Details

    const userO = JSON.parse(localStorage.getItem("usertoken"))

    useEffect(() => {
        console.log("user in trips.js:", user);
        if (user) {
            axios.get(`${process.env.REACT_APP_API_URL}/api/trips/user`, { withCredentials: true })
                .then(res => {
                    setTrips(res.data || []);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [user]);

    const handleMoreDetails = (trip) => {
        setSelectedTrip(trip);
    }

    const handleEdit = (trip) => {
        setIsEditing(true);
        setEditId(trip._id);
        setUpdatedTrip(JSON.parse(JSON.stringify(trip)));
    }

    const handleUpdate = (id) => {
        updateTrip(id, updatedTrip);
        setIsEditing(false);
        setEditId(null);
    }

    const handleCancel = () => {
        setIsEditing(false);
        setEditId(null);
    }

    const updateTrip = (id, updatedTrip) => {
        axios
            .patch(`${process.env.REACT_APP_API_URL}/api/trips/${id}`, updatedTrip, { withCredentials: true })
            .then(response => {
                const updatedTrips = trips.map(trip => trip._id === id ? response.data : trip);
                setTrips(updatedTrips);
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
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className={`dropdown ${show ? 'show' : ''}`}>
            {detailsView
                ? <MoreDetails trip={selectedTrip} onBack={() => setDetailsView(false)} />
                : (
                    <table>
                        <thead>
                            <tr>
                                <th>Location</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Traveler Number</th>
                                <th>Budget Range (1-5)</th>
                                <th>Hotel</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trips && trips.map((trip) => (
                                <tr key={trip._id}>
                                    <td className="text-2xl font-medium text-green-500">{trip.location}</td>
                                    <td>
                                        {isEditing && editId === trip._id
                                            ? <input type="date" value={dayjs(updatedTrip.startDate).format('YYYY-MM-DD')} onChange={e => setUpdatedTrip({ ...updatedTrip, startDate: e.target.value })} />
                                            : dayjs(trip.startDate).format('MM/DD/YYYY')}
                                    </td>
                                    <td>
                                        {isEditing && editId === trip._id
                                            ? <input type="date" value={dayjs(updatedTrip.endDate).format('YYYY-MM-DD')} onChange={e => setUpdatedTrip({ ...updatedTrip, endDate: e.target.value })} />
                                            : dayjs(trip.endDate).format('MM/DD/YYYY')}
                                    </td>
                                    <td>
                                        {isEditing && editId === trip._id
                                            ? <input type="number" value={updatedTrip.travelerNumber} onChange={e => setUpdatedTrip({ ...updatedTrip, travelerNumber: e.target.value })} />
                                            : `${trip.travelerNumber} person`}
                                    </td>
                                    <td>{trip.budget}</td>
                                    <td>{trip.hotel.name}</td>
                                    <td>
                                        {isEditing && editId === trip._id
                                            ? (
                                                <>
                                                    <button onClick={() => handleUpdate(trip._id)}>Accept</button> |
                                                    <button onClick={handleCancel}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className='text-green-500' onClick={() => { handleMoreDetails(trip); setDetailsView(true); }}>More Details</button>
                                                    <button className='text-yellow-400' onClick={() => handleEdit(trip)}> | Edit |</button>
                                                    <button className='text-red-600' onClick={() => deleteTrip(trip._id)}> | Delete|</button>
                                                </>
                                            )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
        </div>
    );
};


export default Trips;