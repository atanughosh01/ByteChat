// Imports required libraries
import React from "react";
import { Channel, useChatContext, MessageTeam } from "stream-chat-react";

// Import all required components
import { ChannelInner, CreateChannel, EditChannel } from './';
// import TeamMessage from "./TeamMessage";

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {

    // Gives us information about the current channel
    const { channel } = useChatContext();

    // isCreating and isEditing are StateFields that referenced to in App.jsx
    // If we are creating a channel, render the channel
    if (isCreating) {
        return (
            <div className="channel__container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        );
    }

    // If we are editing a channel, render the channel
    if (isEditing) {
        return (
            <div className="channel__container">
                <EditChannel setIsEditing={setIsEditing} />
            </div>
        );
    }

    // When we've created a channel, but there are no messages yet, display this
    const EmptyState = () => (
        <div className="channel-empty__container">
            <p className="channel-empty__first">This is the beginning of your chat history.</p>
            <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p>
        </div>
    )


    // Return the UI of our chat section
    return (
        <div className=" channel__container">
            <Channel
                EmptyStateIndicator={EmptyState}
                // Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
                Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
            >
                <ChannelInner setIsEditing={setIsEditing} />
            </Channel>
        </div>
    );
}


// Export the ChannelContainer
export default ChannelContainer;
