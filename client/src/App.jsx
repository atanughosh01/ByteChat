import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from "./components";
import 'stream-chat-react/dist/css/index.css';
import './App.css';


// Get the data sent by backend via cookies
const cookies = new Cookies();

// The api-key that StreamChat uses to connect to the backend
const apiKey = '6m4kt8mrtr5j';

// Get auth token from the stored cookies
const authToken = cookies.get("token");

// Create a new instance of StreamChat by passing the api-key
const client = StreamChat.getInstance(apiKey);

// Seeing if we have that auth-token in the cookies
if (authToken) { 

    // If the user is not created, create an user by passing all the 
    // information from the cookies and open the WebSocket connection
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, authToken);
}


// This App function is the main function that renders the whole app
const App = () => {

    // Funtionalities
    const [createType, setCreateType] = useState('');       // If creating a chatroom, what type is it?
    const [isCreating, setIsCreating] = useState(false);    // Is the User creating a new chatroom?
    const [isEditing, setIsEditing] = useState(false);      // Is the User editing a chatroom?

    // If no auth-token is found, show the Auth component
    if (!authToken) return <Auth />;

    // Return the side-bar and chat-section components if auth-token is found
    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
            </Chat>
        </div>
    );
}


// Exports the App function
export default App;
