import React, { useState, useEffect } from 'react'
import { Element } from 'react-scroll';
import dayjs from 'dayjs';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

// import { getPlacePhoto } from '../api/Google';


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const Examples = ({ tripData }) => {
    // console.log(tripData);
    return (
        <Element className='section examples my-5 ' name='examples' style={{ height: '60vh' }}>
            <div className='p-5 bg-zinc-900/80 flex max-w-7xl  flex-col'>
                <h2 className="text-4xl font-medium text-yellow-300 mb-5">Trip Information</h2>
                <Tabs>
                    <TabList>
                        <Tab>Trip Data</Tab>
                        <Tab>Hotel</Tab>
                        <Tab>Restaurants</Tab>
                        <Tab>Places</Tab>
                    </TabList>

                    <TabPanel>
                    <div className="flex flex-col justify-center items-center">
                      <p className='text-5xl font-bold my-3 text-green-500'>{tripData.location}</p>
                      <p>{tripData.startDate && dayjs(tripData.startDate).format('MM/DD/YYYY')}  -  {tripData.endDate && dayjs(tripData.endDate).format('MM/DD/YYYY')}</p>
                      <div className='flex space-x-4'>
                        <p>{tripData.travelerNumber} Traveler(s)</p>
                        <p>{"$".repeat(tripData.budget)}</p>
                      </div>
                    </div>
                    <p className='text-sm px-20 text-left my-3 border-b pb-3'>{tripData.itinerary}</p>
                        {/* <div className='flex flex-wrap justify-center gap-5'> */}
                        <Carousel autoFocus dynamicHeight centerMode centerSlidePercentage={30} infiniteLoop showArrows>
                            {tripData.city.photos && tripData.city.photos.map((photo, photoIndex) => (
                                <div key={photoIndex} className="">
                                    <img
                                        className=''
                                        src={`https://maps.googleapis.com/maps/api/place/photo?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&photo_reference=${photo.photo_reference}&maxwidth=800&maxheight=800`}
                                        alt={`${tripData.city.name} #${photo.photoIndex}`}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </TabPanel>

                    <TabPanel>
                        <p className='text-3xl font-bold mt-4 text-green-500'>{tripData.hotel.name}</p>
                        <p>{tripData.hotel.address}</p>
                        <p>Rating: {tripData.hotel.rating} Stars</p>
                        <p className='my-2 pb-4  border-b'>{tripData.hotel.description}</p>
                        <Carousel autoFocus dynamicHeight centerMode centerSlidePercentage={30} infiniteLoop showArrows>
                            {tripData.hotel.photos && tripData.hotel.photos.map((photo, photoIndex) => (
                                <div key={photoIndex} className=''>
                                    <img
                                        className=''
                                        src={`https://maps.googleapis.com/maps/api/place/photo?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&photo_reference=${photo.photo_reference}&maxwidth=800&maxheight=800`}
                                        alt={`${tripData.city.name} #${photo.photoIndex}`}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </TabPanel>

                    <TabPanel>
                        <Tabs>
                            <TabList>
                                {tripData.restaurants.map((restaurant, index) => (
                                    <Tab key={index}>Restaurant {index + 1}</Tab>
                                ))}
                            </TabList>
                            {tripData.restaurants.map((restaurant, index) => (
                                <TabPanel key={index}>
                                    <p className='text-3xl font-bold mt-4 text-green-500'>{restaurant.name}</p>
                                    <p>{restaurant.address}</p>
                                    <p>Rating: {restaurant.rating} Stars</p>
                                    <p className='my-2 pb-4  border-b'>{restaurant.description}</p>
                                    <Carousel autoFocus dynamicHeight centerMode centerSlidePercentage={30} infiniteLoop showArrows>
                                        {restaurant.photos && restaurant.photos.map((photo, photoIndex) => (
                                            <div key={photoIndex} className=''>
                                                <img
                                                    className=''
                                                    src={`https://maps.googleapis.com/maps/api/place/photo?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&photo_reference=${photo.photo_reference}&maxwidth=800&maxheight=800`}
                                                    alt={`${tripData.city.name} #${photo.photoIndex}`}
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                </TabPanel>
                            ))}
                        </Tabs>
                    </TabPanel>

                    <TabPanel>
                        <Tabs>
                            <TabList>
                                {tripData.otherPlaces.map((place, index) => (
                                    <Tab key={index}>Place {index + 1}</Tab>
                                ))}
                            </TabList>
                            {tripData.otherPlaces.map((place, index) => (
                                <TabPanel key={index}>
                                    <p className='text-3xl font-bold mt-4 text-green-500'>{place.name}</p>
                                    <p>{place.address}</p>
                                    <p>Rating: {place.rating} Stars</p>
                                    <p className='my-2 pb-4  border-b'>{place.description}</p>
                                    <Carousel autoFocus dynamicHeight centerMode centerSlidePercentage={30} infiniteLoop showArrows>
                                        {place.photos && place.photos.map((photo, photoIndex) => (
                                            <div key={photoIndex} className=''>
                                                <img
                                                    className=''
                                                    src={`https://maps.googleapis.com/maps/api/place/photo?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&photo_reference=${photo.photo_reference}&maxwidth=800&maxheight=800`}
                                                    alt={`${tripData.city.name} #${photo.photoIndex}`}
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                </TabPanel>
                            ))}
                        </Tabs>
                    </TabPanel>
                </Tabs>
            </div>
        </Element>
    );

}

export default Examples;
