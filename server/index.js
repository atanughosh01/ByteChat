const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const app = express();
const PORT = process.env.PORT || 5000;  // use process.env.PORT if available else use PORT 5000

// To call the env variables from right inside our NODE application
require('dotenv').config();

// Enviroment constants
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

// Twilio Credentials
const twilioClient = require('twilio')(accountSid, authToken);

// Middlewares
app.use(cors());                // Enables Cross-Origin Request Sharing
app.use(express.json());        // Allows us to parse JSON payloads transferred from the Frontend to the Backend
app.use(express.urlencoded());  // Parses urlencoded bodies and looks at requests where the Content-Type header matches the type option

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Handles the route responsible for push-notification on user's phone
app.post('/', (req, res) => {

    // Receives the payloads from the Frontend
    const { message, user: sender, type, members } = req.body;

    // If the event is creation of a new message, do the following
    if (type === 'message.new') {
        
        // Loop through the members who are part of the group/channel
        members
            .filter((member) => member.user_id !== sender.id) // filter the msg-sender out of the notifs-list
            .forEach(({ user }) => {

                // Send the alert msg only if the user is OFFLINE / Not using the app
                if (!user.online) {
                    twilioClient.messages.create({
                        body: `You have a new message from ${message.user.fullName} - ${message.text}`,
                        messagingServiceSid: messagingServiceSid,
                        to: user.phoneNumber
                    })
                        .then(() => console.log('Message sent!'))
                        .catch((err) => console.log(err));
                }
            });

        // Message sending was successfull
        return res.status(200).send('Message sent!');
    }

    // No event was triggered
    return res.status(200).send('Not a new message request');
});


// Authentication Routes
app.use('/auth', authRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
