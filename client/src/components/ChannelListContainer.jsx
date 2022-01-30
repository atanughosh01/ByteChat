// It is basically our whole sidebar containing list of channels and direct messages

// Import all required libraries
import React, { useState } from 'react';
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";

// Inport all required components
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import HospitalIcon from "../assets/hospital.png";
import LogOutIcon from "../assets/logout.png";

// Create a cookie object
const cookies = new Cookies();

// This is the sidebar that contains the list of channels and logout button
const SideBar = ({ logout }) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                {/* For the hospital button on the left SideBar click here */}
                <img src={HospitalIcon} alt="Hospital" width="30" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                {/* For logging out of the chat system click this icon here */}
                <img src={LogOutIcon} alt="Logout" width="30" />
            </div>
        </div>
    </div>
)

// This is the company name / users on the left navigation panel
const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">ByteChat</p>
    </div>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {

    // Get the data sent by backend via cookies
    const { client } = useChatContext();

    const logout = () => {

        // Logout of the chat system by clearing the cookies
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        // After the cookies are cleared, redirect the user to the login page
        window.location.reload();
    };

    // Filters the channels that are not direct messages
    const filters = { members: { $in: [client.userID] } };


    // Return the sidebar and the list of channels
    return (
        <>
            {/* Renders the Sidebar (with claender and logout button)
        name/users on the left navigation panel  */}
            <SideBar logout={logout} />    {/* Passing the logout function as a prop to the SideBar component */}
            <div className="channel-list__list__wrapper">
                <CompanyHeader /> {/* Renders the company name / users on the left navigation panel */}
                <ChannelSearch setToggleContainer={setToggleContainer} /> {/* Creates a Search Bar for the user to search for a channel */}
                {/* Renders the list of channels */}
                {/* For group messaging */}
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}       /////////////////////////////////////////////////////////////////////////
                    // Render a custom list
                    List={(listProps) => (
                        // This is our CUSTOM TeamChannelList apart from the ChannelList provided by StreamChat
                        <TeamChannelList
                            // Passes all the props to the TeamChannelList, that were
                            // supposed to be passed to the ChannelList provided by StreamChat
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            // Passes all the props to the TeamChannelPreview, that were
                            // supposed to be passed to the ChannelPreview provided by StreamChat
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="team"
                        />
                    )}
                />

                {/* For direct messaging */}
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    // Render a custom list
                    List={(listProps) => (
                        // This is our CUSTOM TeamChannelList apart from the ChannelList provided by StreamChat
                        <TeamChannelList
                            // Passes all the props to the TeamChannelList, that were
                            // supposed to be passed to the ChannelList provided by StreamChat
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            // Passes all the props to the TeamChannelPreview, that were
                            // supposed to be passed to the ChannelPreview provided by StreamChat
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    );
};


const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            {/* Channel-Lists on SideBar for Desktop version */}
            <div className="channel-list__container">
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
            </div>

            {/* Channel-Lists on SideBar for Mobile version */}
            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff" }}
            >
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                </div>
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                />
            </div>
        </>
    );
};


// Export the ChannelListContainer
export default ChannelListContainer;
