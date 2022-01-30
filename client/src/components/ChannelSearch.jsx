import React, { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";

import { ResultsDropdown } from './'
import { SearchIcon } from '../assets';


// Search support at the searchbar above the Channel and User section on sidebar
const ChannelSearch = ({ setToggleContainer }) => {
    const { client, setActiveChannel } = useChatContext();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [teamChannels, setTeamChannels] = useState([]);
    const [directChannels, setDirectChannels] = useState([]);

    // Clear the previous search results when the query changes
    useEffect(() => {
        if (!query) {
            setTeamChannels([]);
            setDirectChannels([]);
        }
    }, [query]);

    // Searches to get channel/username and if not, it goes to the error handler (Search is reset)
    const getChannels = async (text) => {
        try {
            // Search for the channel name
            const channelResponse = client.queryChannels({
                type: 'team',
                name: { $autocomplete: text },      // Autocomplete the channel name
                members: { $in: [client.userID] }    // Only get channels that the user is a member of
            });

            // Search for the username
            const userResponse = client.queryUsers({
                id: { $ne: client.userID },     // Exclude youself from the search
                name: { $autocomplete: text }   // Autocomplete the username
            });

            // Wait for both queries to finish and then fetch both the channels and users simultaneously
            const [channels, { users }] = await Promise.all([channelResponse, userResponse]);

            if (channels.length) setTeamChannels(channels);
            if (users.length) setDirectChannels(users);

        } catch (error) {
            setQuery(" ");  // Set the query to nothing => just reset the search
        }
    };

    // Fetches the channels and users
    const onSearch = (event) => {
        event.preventDefault();

        setLoading(true);                   // Reloads the web-page
        setQuery(event.target.value);       // what we are searching for
        getChannels(event.target.value);    // Get the channels from the backend
    };

    // When the user clicks on a channel, it sets the active channel and closes the search
    const setChannel = (channel) => {
        setQuery('');
        setActiveChannel(channel);
    };

    // On Pressing Enter, display the UI of channels and users
    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    <SearchIcon />
                </div>
                <input
                    className="channel-search__input__text"
                    placeholder="Search"
                    type="text"
                    value={query}
                    onChange={onSearch}
                />
            </div>
            {/* If our query (search result) exists, show a dropdown of all the matching channels and users */}
            {query && (
                <ResultsDropdown
                    teamChannels={teamChannels}
                    directChannels={directChannels}
                    loading={loading}
                    setChannel={setChannel}
                    setQuery={setQuery}
                    setToggleContainer={setToggleContainer}
                />
            )};
        </div>
    );
};


// Export the ChannelSearch component
export default ChannelSearch;
