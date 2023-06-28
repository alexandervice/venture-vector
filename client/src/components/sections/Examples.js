import React, { useState, useEffect } from 'react'
import { Element } from 'react-scroll';
import { getPlacePhoto } from '../api/Google';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const Examples = ({ tripData }) => {
    // console.log(tripData);
    return (
        <div className='p-5 bg-zinc-600/50'>
            <h2>Travel Information</h2>
            <Tabs>
                <TabList>
                    <Tab>Trip Data</Tab>
                    <Tab>Hotel</Tab>
                    <Tab>Restaurants</Tab>
                    <Tab>Places</Tab>
                </TabList>

                <TabPanel>
                    <p>Location: {tripData.location}</p>
                    <p>Start Date: {tripData.startDate}</p>
                    <p>End Date: {tripData.endDate}</p>
                    <p>Number of Travelers: {tripData.travelerNumber}</p>
                    <p>Budget: {tripData.budget}</p>
                    <p>Itinerary: {tripData.itinerary}</p>
                    <div className='flex flex-wrap justify-center gap-5'>
                        {tripData.city.photos && tripData.city.photos.map((photo, photoIndex) => (
                            <img
                                key={photoIndex}
                                src={`https://maps.googleapis.com/maps/api/place/photo?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&photo_reference=${photo.photo_reference}&maxwidth=400`}
                                alt={`${tripData.city.name} #${photo.photoIndex}`} />
                        ))}
                    </div>
                </TabPanel>

                <TabPanel>
                    <h2>Hotel Information</h2>
                    <p>Name: {tripData.hotel.name}</p>
                    <p>Description: {tripData.hotel.description?.overview}</p>
                    <p>Address: {tripData.hotel.address}</p>
                    <p>Rating: {tripData.hotel.rating}</p>
                    <div className='flex flex-wrap justify-center gap-5'>
                        {tripData.hotel.photos && tripData.hotel.photos.map((photo, photoIndex) => (
                            <img
                                key={photoIndex}
                                src={`https://maps.googleapis.com/maps/api/place/photo?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&photo_reference=${photo.photo_reference}&maxwidth=400`}
                                alt={`${tripData.city.name} #${photo.photoIndex}`} />
                        ))}
                    </div>
                </TabPanel>

                <TabPanel>
                    <h2>Restaurants</h2>
                    {tripData.restaurants.map((restaurant, index) => (
                        <Tabs key={index}>
                            <TabList>
                                <Tab>Restaurant {index + 1}</Tab>
                            </TabList>
                            <TabPanel>
                                <p>Name: {restaurant.name}</p>
                                <p>Address: {restaurant.address}</p>
                                <p>Description: {restaurant.description}</p>
                                <p>Rating: {restaurant.rating}</p>
                                <div className='flex flex-wrap justify-center gap-5'>
                                    {restaurant.photos ?
                                        restaurant.photos.map((photo, photoIndex) => (
                                            <img
                                                key={photoIndex}
                                                src={`https://maps.googleapis.com/maps/api/place/photo?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&photo_reference=${photo.photo_reference}&maxwidth=400`}
                                                alt={`${restaurant.name} #${photo.photoIndex}`} />
                                        )) : ""}
                                </div>
                            </TabPanel>
                        </Tabs>
                    ))}
                </TabPanel>

                <TabPanel>
                    <h2>Other Places</h2>
                    <Tabs>
                        <TabList>
                            {tripData.otherPlaces.map((place, index) => (
                                <Tab key={index}>Place {index + 1}</Tab>
                            ))}
                        </TabList>
                        {tripData.otherPlaces.map((place, index) => (
                            <TabPanel key={index}>
                                <p>Name: {place.name}</p>
                                <p>Address: {place.address}</p>
                                <p>Description: {place.description}</p>
                                <p>Rating: {place.rating}</p>
                                <div className='flex flex-wrap justify-center gap-5'>
                                    {place.photos ?
                                        place.photos.map((photo, photoIndex) => (
                                            <img
                                                key={photoIndex}
                                                src={`https://maps.googleapis.com/maps/api/place/photo?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&photo_reference=${photo.photo_reference}&maxwidth=400`}
                                                alt={`${place.name} #${photo.photoIndex}`} />
                                        )) : ""}
                                </div>
                            </TabPanel>
                        ))}
                    </Tabs>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Examples
