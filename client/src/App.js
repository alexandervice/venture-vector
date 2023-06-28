import React, { useState, useRef, useEffect } from "react";

import Navbar from "./components/Navbar"
import Hero from "./components/sections/Hero";
import Search from "./components/sections/Search";
import Examples from "./components/sections/Examples";
import About from "./components/sections/About";
import Trips from "./components/Trips";
import SignIn from "./components/sections/SignIn";

function App() {
  const [user, setUser] = useState(null); // Set this value when the user logs in so we can know if they are logged in and what their info is
  // if we would rather not useState for this we can also save the user info into local storage. This way we can keep them logged in until they choose to log out
  // const checkToken = () => {
  //   if (localStorage.getItem('usertoken')) {
  //     setUser(true);
  //   } else {
  //     setUser(false);
  //   }
  // };

  useEffect(() => {
    const userO = JSON.parse(localStorage.getItem("usertoken"));
    setUser(userO);
  }, []);

  const fullPageRef = useRef();
  const [activeSection, setActiveSection] = useState(0);
  const [viewSignIn, setViewSignIn] = useState(false);
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
    <div className=" App bg-image-light dark:bg-image-dark text-white dark:text-white flex flex-col align-center justify-center text-center">
      <div className="background">
        <Navbar user={user} setUser={setUser} viewSignIn={viewSignIn} setViewSignIn={setViewSignIn} fullPageApi={{ moveTo: (page) => fullPageRef.current && fullPageRef.current.moveTo(page) }} activeSection={activeSection} />
        {viewSignIn ? <SignIn user={user} setUser={setUser} setViewSignIn={setViewSignIn} viewSignIn={viewSignIn} /> : <div></div>}
        <Hero />
        <Search tripData={tripData} setTripData={setTripData} />
        <Examples tripData={tripData} />
        <About />
        <Trips tripData={tripData} user={user} setUser={setUser} show={false} />
      </div>
    </div>
  );
}

export default App;
