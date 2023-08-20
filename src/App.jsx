import { useState } from 'react';
import SignUpForm from './components/SignUpForm';
import Authenticate from './components/Authenticate';
import './App.css';

function App() {
  // Added State to be able to hide the SignUpForm when Auth succeeds
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  
  // Takes care of handle token and successful Auth
  const handleAuthSuccess = (token) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  return (
    // Have the SignUpForm disappear if the token is accepted when the "Authenticate" button is clicked
    <div className='app-cont'>
      {!isAuthenticated && <SignUpForm setToken={handleAuthSuccess} />}
      <Authenticate token={token} />
    </div>
  );
}

export default App
