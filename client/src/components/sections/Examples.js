import React from 'react'
import { Element } from 'react-scroll';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const Examples = ({ tripData }) => {
    console.log(tripData);
    return (
        <div>
            <h2>Travel Information</h2>
            <Tabs>
                <TabList>
                    <Tab>Basic Info + City</Tab>
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
                </TabPanel>

                <TabPanel>
                    <h2>Hotel Information</h2>
                    <p>Name: {tripData.hotel.name}</p>
                    <p>Description: {tripData.hotel.description?.overview}</p>
                    <p>Address: {tripData.hotel.address}</p>
                    <p>Rating: {tripData.hotel.rating}</p>
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
                            </TabPanel>
                        </Tabs>
                    ))}
                </TabPanel>

                <TabPanel>
                    <h2>Places to visit</h2>
                    {tripData.otherPlaces.map((place, index) => (
                        <Tabs key={place.placeId}>
                            <TabList>
                                <Tab>Place {index + 1}</Tab>
                            </TabList>
                            <TabPanel>
                                <p>Name: {place.name}</p>
                                <p>Address: {place.address}</p>
                            </TabPanel>
                        </Tabs>
                    ))}
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default Examples
