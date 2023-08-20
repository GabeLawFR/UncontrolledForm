import { useState } from 'react';

export default function Authenticate({token}) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(null);

    async function handleClick(){
        console.log("handleClick fired!!")  
        try{
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', { 
              method: "GET", 
              headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
              }
            });
            
            const result = await response.json();
            setSuccessMessage(result.message);
            setUsername(result.data.username);
            console.log(result);
        }catch (error) {
            setError(error.message);
        }
    }

    return (
        // Added a conditional rendering of "Logged in as:" when log in is successful
        <div className='auth-cont'>
            <h2 className='auth-title'>Authenticate!</h2>
            <p>Then once that is done, click the "Authenticate" button:</p>
            {successMessage && <p className='success-p'>{successMessage}</p>}
            {error && <p className='error-p'>{error}</p>}
            {username && <p className='ze-p'>Logged in as: {username}</p>}
            <button className='buttons' onClick={handleClick}>
            Authenticate Token
            </button>
        </div>
    );
}
