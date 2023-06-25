import React from 'react';
import dayjs from 'dayjs';

const Trips = ({ trips, show }) => (
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
                {trips.map(({ address, startDate, endDate, travelerNumber, budget }) => (
                    <tr key={address}>
                        <td>{address}</td>
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

export default Trips;