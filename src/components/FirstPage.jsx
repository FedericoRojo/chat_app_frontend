import {useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';


function FistPage({ error, setError, loggedIn }){
    const navigate = useNavigate();
    const [blogPosts, setBlogPosts] = useState([]);

   /*
    useEffect(() => {
       
        countTotalPosts();
        if (tags.length === 0) {
            fetchTags();
        }
    }, []);

   
    
    async function fetchPersonalInfo() {
        try{
            
            const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/users/personal-info`);
            if(!response.ok){
                setError(response.status);
            }else{
                const json = await response.json();
                setPersonalInfo(json.result);
            }
        }catch(error){
            setError(error.message);
        }
    }*/
 
    return(
        <div className='first-page-container'>
            <div className='f-p-central'>
                <img />
                <button onClick={() => navigate('/login')}>Login</button>
                <p>If you don't have an account create one here. 
                    <span onClick={() => navigate('/register')}>
                        Register
                    </span>
                </p>
            </div>
        </div>
    )

}

export default FistPage;