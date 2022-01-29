import React, { useState, useEffect } from "react";
import { getChannel, useChatContext } from "stream-chat-react";

import { SearchIcon } from "../assets";

const ChannelSearch = () => {
    const { query, setQuery } = useState(" ");
    const { loading, setLoading } = useState(false);

    const getChannels = async (text) => {
        // Tries to get the actual channel and if not, it goes to the error handler
        try {

            // TODO : This is a temporary fix for the channel not being fetched
            // TODO : Fetch the channels from the backend

        } catch (error) {
            setQuery(" ");  // Set the query to nothing => just reset the search
        }
    };

    const onSearch = (event) => {
        event.preventDefault(); // Prevents the default behavior, eg: Clicking on a "Submit" button, prevent it from submitting a form

        setLoading(true);                   // Reloads the web-page
        setQuery(event.target.value);       // what we are searching for
        getChannels(event.target.value);    // Get the channels from the backend
    }

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
                    onChange={onSearch}    // Passing the onSearch function
                />
            </div>
        </div>
    );
};

export default ChannelSearch;
