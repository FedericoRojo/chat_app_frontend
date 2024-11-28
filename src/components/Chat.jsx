import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Chat.css';

const Chat = ({user}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [mText, setMText] = useState('');
    const [search, setSearch] = useState('');
    const [creatingGroup, setCreatingGroup] = useState(false);
    const [searching, setSearching] = useState(true); //By default you search in chats, if you want to add a friend it's set to false
    const [chatSelected, setChatSelected] = useState(null);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0)
    
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
       if(user){
        fetchUsers();
       }
      }, []);

    const fetchUsers = async () => {
        console.log(user);
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/users?limit=${limit}&offset=${offset}`, {
                headers: { Authorization: user.token },
            });
            if(!response.ok){
                setError('Error while getting users')
            }else{
                const data = await response.json();
                setUsers(data.result);
            }
        } catch(e) {
            setError(e.message);
        }
        setLoading(false);
    }
        
    


    async function handleMessageSubmit(e){
        e.preventDefault();
       
    }

    return (
        <div className="chat-page-container">
           <div className='chat-p-chats'>
                <div className='chat-p-chats-header'>
                    <img></img>
                    <h3>Chats</h3>
                </div>
                <div className='chat-p-chats-content'> 
                    { 
                    loading ? 
                    (<div>Loading</div>) : 
                    (
                     searching ? 
                        (<>
                            <div className='search-chat'>
                                <form>
                                    <input
                                        type="text"
                                        id="search"
                                        name="search"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                    <button>Buscar</button>
                                </form>
                            </div>
                            <div className='chats-card'>
                                <img />
                                <h4>Name</h4>
                            </div>
                         </>) : 
                        (<>
                            <div className='search-chat'>
                                <form>
                                    <input
                                        type="text"
                                        id="search"
                                        name="search"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                    <button>Buscar</button>
                                </form>
                            </div>
                            <div className='chats-card'>
                                <img />
                                <h4>Name</h4>
                                <button>ADD</button>
                            </div>
                        </>) 
                    )}      
                    
                </div>
                <div className='chat-p-chats-buttons'>
                    <button>Add friend</button>
                    <button>Create Group</button>
                </div>
           </div>
           <div className='chat-content-container'>
                <div className='chat-header'>
                    {
                        chatSelected != null ? 
                            (<div>
                                <img/>
                                <h2>Name</h2>
                            </div>) : 
                            ( creatingGroup ? 
                                (<>Create Group</>) : 
                                (<h2>Chats</h2>)
                            )    
                    }
                    {error && (<h2>{error}</h2>)}
                </div>
                {chatSelected != null ? (
                    <div className='chat-content'>
                        <div className='chat-message-card'>

                        </div>
                        <div className='chat-create-message'>
                            <form onSubmit={handleMessageSubmit}>
                                <textarea
                                    id="m_text"
                                    name="m_text"
                                    value={mText}
                                    onChange={e => setMText(e.target.value)}
                                />
                                <div>
                                    <button>Add image</button>
                                    <button>Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    creatingGroup ? 
                        (<div className='chat-group-creator'>
                            <div className='c-g-c-search'>
                                
                            </div>
                            { memberList.length != 0 && (
                                <div className='c-g-c-members'>
                                    
                                </div>
                            )}
                            <div className='c-g-c-users-list'>

                            </div>
                        </div>) : 
                        (<></>)
                )}
           </div>
        </div>
    );
};

export default Chat;
