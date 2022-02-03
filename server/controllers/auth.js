// Import the required modules
const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

// dotenv is a module that allows us to access the environment variables
require('dotenv').config();

// Declare the the constants
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

// Takes care of the signup action
const signup = async (req, res) => {
    try {
        // Receives the payloads from the frontend via client requests
        const { fullName, username, password, phoneNumber } = req.body;

        // Creates a random string of 16 hexadecimal digits and maps it to the specific username as the user-id
        const userId = crypto.randomBytes(16).toString('hex');

        // All of these should be secret and is not meant to be shared with the client/user
        const serverClient = connect(api_key, api_secret, app_id);

        // Generating an encrypted password with specified salt (level of encryption = 10)
        const hashedPassword = await bcrypt.hash(password, 10); // 10 defines how much encrypted the password will be

        // Using the serverClient to generate a new user token
        const token = serverClient.createUserToken(userId);

        // Sets the response header by passing the attributes of the json() method
        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });

    } catch (error) {
        // If there is an error, return an error message
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Takes care of the login action
const login = async (req, res) => {
    try {
        // Receives the payloads from the frontend
        const { username, password } = req.body;

        // All of these should be secret and is not meant to be shared with the client/user
        const serverClient = connect(api_key, api_secret, app_id);

        // Creating a new client by instantiating the StreamChat class
        const client = StreamChat.getInstance(api_key, api_secret);

        // We are querying the database to find the user with the specified username
        const { users } = await client.queryUsers({ name: username });

        // If the user is not found, return an error message
        if (!users.length) {
            return res.status(400).json({ message: 'User not found' });
        }

        // If the user is found, we are going to compare the hashed password with the password provided by the user
        const success = await bcrypt.compare(password, users[0].hashedPassword);

        // We are going to generate a new user token by passing that user's id
        const token = serverClient.createUserToken(users[0].id);

        // Checks the password
        if (success) {
            // If the password matches, we're going to send the user's token, name, username, and id
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id });
        } else {
            // If the password is incorrect, return an error message
            return res.status(500).json({ message: 'Incorrect password' });
        }

    } catch (error) {
        // If there is an error, return an error message
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// Exports the backend authenticator
module.exports = { signup, login };
