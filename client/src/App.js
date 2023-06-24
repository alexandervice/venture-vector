import React, { useState, useRef } from "react";
import Fullpage from '@ap.cx/react-fullpage';
import Section from './components/Section';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(true); // Set this value when the user logs in so we can know if they are logged in and what their info is
  // if we would rather not useState for this we can also save the user info into local storage. This way we can keep them logged in until they choose to log out
  const fullPageRef = useRef();
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="App flex flex-col align-center justify-center text-center">
      <div className="background">
        <Navbar user={user} setUser={setUser} fullPageApi={{ moveTo: (page) => fullPageRef.current && fullPageRef.current.moveTo(page) }} activeSection={activeSection} />
        <Fullpage ref={fullPageRef} onSectionChange={(nextIndex) => setActiveSection(nextIndex)}>
          <Section />
        </Fullpage>
      </div>
    </div>
  );
}

export default App;
