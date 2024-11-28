import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";

const Login = ({setUser}) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        try{
            
            const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password})
            });

            if(!response.ok){
                throw new Error('Login failed');
            }
            
            const data = await response.json();

            
            localStorage.setItem('token', data.result.token);
            
            setUser(data.result);
            navigate('/chat');
        }catch(error){
            setError(error.message);
        }
    }

    return (
        <div className="login-page-container">
            <div className="back-arrow" onClick={() => navigate('/')}>
                &#8592; 
            </div>

            <div className="login-form-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" required
                         value={username}
                         onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" required
                         value={password}
                         onChange={e => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
