import React from 'react';
import dayjs from 'dayjs';
import { Carousel } from 'react-responsive-carousel';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const MoreDetails = ({ trip, onBack }) => {
    return (
        <div>
            <button onClick={onBack}>Back</button>

            <Tabs>
                <TabList>
                    <Tab>Trip Data</Tab>
                    <Tab>Hotel</Tab>
                    <Tab>Restaurants</Tab>
                    <Tab>Places</Tab>
                </TabList>

                <TabPanel>
                    <p>Location: {trip.location}</p>
                    <p>Start Date: {dayjs(trip.startDate).format('MM/DD/YYYY')}</p>
                    <p>End Date: {dayjs(trip.endDate).format('MM/DD/YYYY')}</p>
                    <p>Number of Travelers: {trip.travelerNumber}</p>
                    <p>Budget: {trip.budget}</p>
                    <p>Itinerary: {trip.itinerary}</p>
                    {/* <div className='flex flex-wrap justify-center gap-5'> */}
                    <Carousel autoFocus dynamicHeight centerMode centerSlidePercentage={30} infiniteLoop showArrows>
                        {trip.city.photos && trip.city.photos.map((photo, photoIndex) => (
                            <div key={photoIndex} className="">
                                <img
                                    className=''
                                    src={`https://maps.googleapis.com/maps/api/place/photo?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&photo_reference=${photo.photo_reference}&maxwidth=800&maxheight=800`}
                                    alt={`${trip.city.name} #${photo.photoIndex}`}
                                />
                            </div>
                        ))}
                    </Carousel>
                </TabPanel>

                <TabPanel>
                    <h2>Hotel Information</h2>
                    <p>Name: {trip.hotel.name}</p>
                    <p>Description: {trip.hotel.description}</p>
                    <p>Address: {trip.hotel.address}</p>
                    <p>Rating: {trip.hotel.rating}</p>
                    <Carousel autoFocus dynamicHeight centerMode centerSlidePercentage={30} infiniteLoop showArrows>
                        {trip.hotel.photos && trip.hotel.photos.map((photo, photoIndex) => (
                            <div key={photoIndex} className=''>
                                <img
                                    className=''
                                    src={`https://maps.googleapis.com/maps/api/place/photo?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&photo_reference=${photo.photo_reference}&maxwidth=800&maxheight=800`}
                                    alt={`${trip.city.name} #${photo.photoIndex}`}
                                />
                            </div>
                        ))}
                    </Carousel>
                </TabPanel>

                <TabPanel>
                    <h2>Restaurants</h2>
                    <Tabs>
                        <TabList>
                            {trip.restaurants.map((restaurant, index) => (
                                <Tab key={index}>Restaurant {index + 1}</Tab>
                            ))}
                        </TabList>
                        {trip.restaurants.map((restaurant, index) => (
                            <TabPanel key={index}>
                                <p>Name: {restaurant.name}</p>
                                <p>Address: {restaurant.address}</p>
                                <p>Description: {restaurant.description}</p>
                                <p>Rating: {restaurant.rating}</p>
                                <Carousel autoFocus dynamicHeight centerMode centerSlidePercentage={30} infiniteLoop showArrows>
                                    {restaurant.photos && restaurant.photos.map((photo, photoIndex) => (
                                        <div key={photoIndex} className=''>
                                            <img
                                                className=''
                                                src={`https://maps.googleapis.com/maps/api/place/photo?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&photo_reference=${photo.photo_reference}&maxwidth=800&maxheight=800`}
                                                alt={`${trip.city.name} #${photo.photoIndex}`}
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            </TabPanel>
                        ))}
                    </Tabs>
                </TabPanel>

                <TabPanel>
                    <h2>Other Places</h2>
                    <Tabs>
                        <TabList>
                            {trip.otherPlaces.map((place, index) => (
                                <Tab key={index}>Place {index + 1}</Tab>
                            ))}
                        </TabList>
                        {trip.otherPlaces.map((place, index) => (
                            <TabPanel key={index}>
                                <p>Name: {place.name}</p>
                                <p>Address: {place.address}</p>
                                <p>Description: {place.description}</p>
                                <p>Rating: {place.rating}</p>
                                <Carousel autoFocus dynamicHeight centerMode centerSlidePercentage={30} infiniteLoop showArrows>
                                    {place.photos && place.photos.map((photo, photoIndex) => (
                                        <div key={photoIndex} className=''>
                                            <img
                                                className=''
                                                src={`https://maps.googleapis.com/maps/api/place/photo?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&photo_reference=${photo.photo_reference}&maxwidth=800&maxheight=800`}
                                                alt={`${trip.city.name} #${photo.photoIndex}`}
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            </TabPanel>
                        ))}
                    </Tabs>
                </TabPanel>
            </Tabs>
            <button onClick={onBack}>Back</button>
        </div>
    );
};

export default MoreDetails;