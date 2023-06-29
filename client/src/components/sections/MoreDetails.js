import React from 'react';
import dayjs from 'dayjs';
import { Carousel } from 'react-responsive-carousel';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const MoreDetails = ({ trip, onBack }) => {
    return (
        <div className='p-5 flex flex-col'>
            <button className='text-3xl border-b mb-5 px-3 pb-3 hover:text-yellow-500'  onClick={onBack}>Back</button>

            <Tabs>
                <TabList>
                    <Tab>Trip Data</Tab>
                    <Tab>Hotel</Tab>
                    <Tab>Restaurants</Tab>
                    <Tab>Places</Tab>
                </TabList>

                <TabPanel>
                    <div className="flex flex-col justify-center items-center">
                      <p className='text-5xl font-bold my-3 text-green-500'>{trip.location}</p>
                      <p>{dayjs(trip.startDate).format('MM/DD/YYYY')} - {dayjs(trip.endDate).format('MM/DD/YYYY')}</p>
                      <div className='flex space-x-4'>
                        <p>{trip.travelerNumber} Traveler(s)</p>
                        <p>{"$".repeat(trip.budget)}</p>
                      </div>
                    </div>
                    <p className='text-sm px-20 text-left my-3 border-b pb-3'>{trip.itinerary}</p>
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
                    <p className='text-3xl font-bold mt-4 text-green-500'>{trip.hotel.name}</p>
                    <p>{trip.hotel.address}</p>
                    <p>Rating: {trip.hotel.rating} Stars</p>
                    <p className='my-2 pb-4  border-b'>{trip.hotel.description}</p>
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
                    <Tabs>
                        <TabList>
                            {trip.restaurants.map((restaurant, index) => (
                                <Tab key={index}>Restaurant {index + 1}</Tab>
                            ))}
                        </TabList>
                        {trip.restaurants.map((restaurant, index) => (
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
                    <Tabs>
                        <TabList>
                            {trip.otherPlaces.map((place, index) => (
                                <Tab key={index}>Place {index + 1}</Tab>
                            ))}
                        </TabList>
                        {trip.otherPlaces.map((place, index) => (
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
            <button className='text-3xl border-t mb-3 px-3 py-3 hover:text-yellow-500'  onClick={onBack}>Back</button>
        </div>
    );
};

export default MoreDetails;