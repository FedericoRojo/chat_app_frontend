import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import FirstPage from './FirstPage';
import Login from './Login';
import Chat from './Chat';
import Register from './Register';

//7hs
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/users/auth`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          setUser(data.result);
        } catch {
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />}></Route>
        <Route path="/login" element={<Login setUser={setUser}/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/chat" element={<Chat user={user} />}></Route>
      </Routes>
    </Router>
  )
}

export default App
