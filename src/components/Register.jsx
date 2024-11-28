import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [feedback, setFeedback] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        try{
            
            const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password})
            });

            if(!response.ok){
                setError('Login failed');
            }else{
                
                setFeedback(true);
                setTimeout(() => {
                    setFeedback(false);
                    navigate('/'); 
                }, 3000);

            }
            
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
                {error != null && (<p className='error'>{error}</p>)}
                {feedback && (<p className='success'>Registered correctly</p>)}
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" required
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        Password:
                        <input 
                        type="password" name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required />
                    </label>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
