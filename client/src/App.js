import './App.css';
import React, { useState } from "react"
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import Examples from './components/sections/Examples';
import Search from './components/sections/Search';
import About from './components/sections/About';



function App() {
  const [user, setUser] = useState(false); // Set this value when the user logs in so we can know if they are logged in and what their info is
  // if we would rather not useState for this we can also save the user info into local storage. This way we can keep them logged in until they choose to log out


  return (
    <div className="App flex flex-col align-center justify-center text-center">
      <div className="background">
        <Navbar />
        <Hero />
        <Examples />
        <Search />
        <About />
      </div>
    </div>
  );
}

export default App;
