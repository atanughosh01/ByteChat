// It is basically our whole sidebar containing list of channels and direct messages

// Import all required libraries
import React from "react";
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

const ChannelListContainer = () => {

  // Return the sidebar and the list of channels
  return (
    <>
        {/* Renders the Sidebar (with claender and logout button)
        name/users on the left navigation panel  */}
        <SideBar />      {/* Passing the logout function as a prop to the SideBar component */}
        <div className="channel-list__list__wrapper">
            <CompanyHeader /> {/* Renders the company name / users on the left navigation panel */}
            <ChannelSearch /> {/* Creates a Search Bar for the user to search for a channel */}
            {/* Renders the list of channels */}
            {/* For group messaging */}
            <ChannelList
                filters={{  }}
                channelRenderFilterFn={() => { }}
                // Render a custom list
                List={(listProps) => (
                    // This is our CUSTOM TeamChannelList apart from the ChannelList provided by StreamChat
                    <TeamChannelList
                        // Passes all the props to the TeamChannelList, that were
                        // supposed to be passed to the ChannelList provided by StreamChat
                        {...listProps}
                        type="team"
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview
                        // Passes all the props to the TeamChannelPreview, that were
                        // supposed to be passed to the ChannelPreview provided by StreamChat
                        {...previewProps}
                        type="team"
                    />
                )}
            />

            {/* For direct messaging */}
            <ChannelList
                filters={{  }}
                channelRenderFilterFn={() => { }}
                // Render a custom list
                List={(listProps) => (
                    // This is our CUSTOM TeamChannelList apart from the ChannelList provided by StreamChat
                    <TeamChannelList
                        // Passes all the props to the TeamChannelList, that were
                        // supposed to be passed to the ChannelList provided by StreamChat
                        {...listProps}
                        type="messaging"
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview
                        // Passes all the props to the TeamChannelPreview, that were
                        // supposed to be passed to the ChannelPreview provided by StreamChat
                        {...previewProps}
                        type="messaging"
                    />
                )}
            />
        </div>
    </>
);
};

// Export the ChannelListContainer
export default ChannelListContainer;
