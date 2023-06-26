import React, { useState, useRef } from "react";

import Navbar from "./components/Navbar"
import Hero from "./components/sections/Hero";
import Search from "./components/sections/Search";
import Examples from "./components/sections/Examples";
import About from "./components/sections/About";

function App() {
  const [user, setUser] = useState(true); // Set this value when the user logs in so we can know if they are logged in and what their info is
  // if we would rather not useState for this we can also save the user info into local storage. This way we can keep them logged in until they choose to log out
  const fullPageRef = useRef();
  const [activeSection, setActiveSection] = useState(0);
  const [tripData, setTripData] = useState({
    location: "",
    startDate: "",
    endDate: "",
    travelerNumber: 1,
    budget: 3,
    itinerary: "",
    city: {},
    hotel: {},
    restaurants: [],
    otherPlaces: []
  });

  return (
    <div className="App flex flex-col align-center justify-center text-center">
      <div className="background">
        <Navbar user={user} setUser={setUser} fullPageApi={{ moveTo: (page) => fullPageRef.current && fullPageRef.current.moveTo(page) }} activeSection={activeSection} />
        <Hero />
        <Search tripData={tripData} setTripData={setTripData} />
        <Examples tripData={tripData} />
        <About />
      </div>
    </div>
  );
}

export default App;
