import { useState } from 'react'

export default function SignUpForm({setToken}) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    
    async function handleSubmit(event) {
        event.preventDefault();

        // Gives error if username or password too short, and returns to exit function if condition not met, clears the input field to avoid having the error message stay even after more characters added, clears password's field as well for convinience
        if (username.length < 8) {
            setError('Username must be eight characters or more!');
            setUserName('');
            setPassword('');
            return;
        }

        // Same as above, but does not clear username for convience
        if (password.length < 8) {
            setError('Password must be 8 characters or more!');
            setPassword('');
            return;
        }

        try {
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            setToken(result.token);
            setUserName('');
            setPassword('');
            setError(null);
            console.log(result);
        }catch (error) {
            setError(error.message);
        }
    };
    // If more characters are added after the error message, the message goes away, and the error is set back to ('')
    const handleUsernameChange = (event) => {
        setError(null);
        setUserName(event.target.value);
    };

    // Same as above but acting on the password input field
    const handlePasswordChange = (event => {
        setError(null);
        setPassword(event.target.value);
    })

    return (
        <div className='signup-cont'>
            <h2 className='signup-title'>Sign Up Now!</h2>
            <p>Firsts start by chosing a Username and a Password meeting requirements.<br /> Then click submit:</p>
            {error && <p className='error-p'>{error}</p>}
            <div className='form-cont'>
                <form className='ze-form' onSubmit={handleSubmit}>
                    <label className='labels'>
                        Username: 
                        <br />
                        <p className='signup-hint'>* Must be eight characters or more</p>
                        <input
                        className='inputs'
                        key='username-input'
                        value={username}
                        onChange={handleUsernameChange}/>
                    </label>
                    <br />
                    <label className='labels'>
                        Password: 
                        <br />
                        <p className='signup-hint'>* Must be eight characters or more</p>
                        <input
                        className='inputs'
                        type="password"
                        key='password-input'
                        value={password}
                        onChange={handlePasswordChange}/>
                    </label>
                    <br />
                    <button className='buttons'>Submit</button>
                </form>
            </div>
        </div>
    );
}