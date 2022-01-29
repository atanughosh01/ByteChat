const express = require('express');     // import express module
const cors = require('cors');           // import Cross-Origin Request Sharing module

const authRoutes = require('./routes/auth.js');  // import routes for authentication

const app = express();                  // Create an instance of express
const PORT = process.env.PORT || 5000;  // use process.env.PORT if available else use PORT 5000

// This is going to allow us to call the env variables right inside our NODE application
require('dotenv').config();

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
// const twilioClient = require('twilio')(accountSid, authToken);

// Middlewares
app.use(cors());                // Enables Cross-Origin Request Sharing
app.use(express.json());        // Allows us to parse JSON payloads from the Frontend to the Backend
app.use(express.urlencoded());  // Only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Authentication Routes
app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// app.post('/', (req, res) => {
//     const { message, user: sender, type, members } = req.body;

//     if(type === 'message.new') {
//         members
//             .filter((member) => member.user_id !== sender.id)
//             .forEach(({ user }) => {
//                 if(!user.online) {
//                     twilioClient.messages.create({
//                         body: `You have a new message from ${message.user.fullName} - ${message.text}`,
//                         messagingServiceSid: messagingServiceSid,
//                         to: user.phoneNumber
//                     })
//                         .then(() => console.log('Message sent!'))
//                         .catch((err) => console.log(err));
//                 }
//             })

//             return res.status(200).send('Message sent!');
//     }

//     return res.status(200).send('Not a new message request');
// });

