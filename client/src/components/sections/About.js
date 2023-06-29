import React from 'react'
import { Element } from 'react-scroll';

const About = () => {
    return (
        <Element name='about' className='section' style={{ height: '120vh' }}>
            <div className='p-5 bg-zinc-900/80 flex max-w-7xl flex-col'>
                <h2 className="text-4xl font-medium text-yellow-300 my-5">About Venture Vector</h2>
                <p className='text-start'>
                    VentureVector is an immersive full-stack application developed by <span className="text-2xl font-medium text-green-500">Alexander Vice</span>  and <span span className="text-2xl font-medium text-green-500">Nandor Nagy</span> . This innovative project was born out of the rigorous Coding Dojo Bootcamp, reflecting the expansive skillset we acquired over a 6-month learning journey. Designed to demonstrate our expertise, Venture Vector leverages a diverse array of technical resources, intertwining frontend and backend programming to create an engaging user experience.
                </p>
                <h2 className="text-2xl font-medium text-yellow-300 my-5">Technologies Used</h2>
                <p className='text-start'>
                    In developing Venture Vector, we've utilized the MERN stack (MongoDB, Express.js, React.js, Node.js) to ensure smooth, seamless functionality. For the frontend, technologies such as "axios", "react-router-dom", "react-scroll", "react-spring", and "react-toggle-dark-mode", amongst others, were incorporated to ensure an interactive and responsive user interface. On the backend, our application is supported by technologies like "axios", "bcrypt", "body-parser", "cookie-parser", "express", "jsonwebtoken", "mongoose", and "validator" to manage data securely and efficiently.
                </p>
                <h2 className="text-2xl font-medium text-yellow-300 my-5">How Does It Work?</h2>
                <p className='text-start'>
                    Venture Vector is all about providing a customized travel experience. It starts with users filling out a simple form, providing us with information about the city they intend to visit, their travel dates, the number of travelers, and their budget. Upon clicking the "Plan My Trip" button, this data is then sent to ChatGPT, which uses it to generate a tailored trip itinerary.
                </p>
                <p className='text-start'>
                    ChatGPT provides recommendations on hotels to book, restaurants to eat at, and sights to see, all while generating a descriptive itinerary. But the process doesn't stop there. This generated itinerary is then sent to Google API for further refinement. It uses the data to add real-world details such as photos, addresses, descriptions, and ratings to the itinerary, ensuring the information provided is as accurate and up-to-date as possible.
                </p>
                <p className='text-start'>
                    Once this enriched data is sent back to our frontend, we present the user with a comprehensive, personalized travel plan. If users are logged in, they can save this itinerary to our MongoDB database for future reference, allowing them to revisit and adjust their plans as needed.
                </p>
                <h2 className="text-2xl font-medium text-yellow-300 my-5">User Interactions and Single Page Application</h2>
                <p className='text-start'>
                    In addition to planning trips, Venture Vector also provides a range of user interaction possibilities. Users can navigate to a page where their past trips are saved and perform basic CRUD operations. They can update their trips, perhaps adjusting their budget or adding new sights to their itinerary, or they can delete trips if plans change.
                </p>
                <p className='text-start'>
                    Most importantly, Venture Vector has been designed as a Single Page Application (SPA). This means that all user interactions take place on a single web page, enhancing the application's speed, responsiveness, and usability. This is part of our commitment to providing a smooth, seamless experience for our users, from trip planning to revisiting memories of their past adventures.
                </p>
                <p className='text-start'>
                    We invite you to explore Venture Vector, and we hope it provides an enriching, enjoyable experience that adds value to your travel planning process.
                </p>

            </div>
        </Element>
    )

}

export default About
