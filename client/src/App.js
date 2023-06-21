import './App.css';
import React, {useState} from "react;"

function App() {
  const [user, setUser] = useState(false); // Set this value when the user logs in so we can know if they are logged in and what their info is
  // if we would rather not useState for this we can also save the user info into local storage. This way we can keep them logged in until they choose to log out

  return (
    <div className="App flex flex-col align-center justify-center text-center">
      <h2>CodingDojo Group Project</h2>
      <h3>React Frontend - App.js</h3>
      <h4>Created from a new branch</h4>
    </div>
  );
}

export default App;
