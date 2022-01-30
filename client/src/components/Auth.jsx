// Auth.jsx is basically the authentication component (signup/signin page) of our project.
// It is a stateful component. It has two states: isSignup and isSignin.

// Import the required libraries and components
import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import signinImage from "../assets/signup.jpg";

// Instance of cookies to add the backend tokens to the frontend
const cookies = new Cookies();

// By default each attribute is set to an empty string
const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
};

// Creates an UI for authentication of the user (signup and login)
// Backend API is used to create a new user or login an existing user
const Auth = () => {
    const [form, setForm] = useState(initialState);

    // isSignup is a boolean variable that decides whether to show the signup or signin form.
    // const [isSignup, setfirst] = useState(false); // false = signin, true = signup
    const [isSignup, setIsSignup] = useState(true);


    // This function takes care of updating the state-field of the form
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }


    // Handles the signup and signin of the user and makes request to the backend API
    const handleSubmit = async (e) => {

        // Stop reloading the page after every form entry
        e.preventDefault();

        // Get all the user-data from the form that users have filled
        const { username, password, phoneNumber, avatarURL } = form;

        // Get the URL
        // const URL = "http://localhost:5000/auth";
        const URL = "https://byte-chat-app.herokuapp.com/auth";

        
        // Make a request to the backend to signup or login the user and pass the form-data to the backend
        // Based on the option chosen (signup, login) the request is sent to TWO DIFFERENT ENDPOINTS (URL-s)
        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });

        // Tokens are stored in the cookies in case of login
        // These tokens are basically the response (data) of backend after client makes a request
        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        // Tokens mentioned above and below, all are stored in case of signup
        if (isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        // After cookies are stored, reload the application
        // While the app is reloading, during that time our auth tokens will be filles
        window.location.reload();
    }

    // Get previous value of a statefield
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    // Returns the UI of the authentication form
    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                                ? "Already have an account?"
                                : "Don't have an account?"
                            }
                            <span onClick={switchMode}>
                                {isSignup ? 'Sign In' : 'Sign Up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
            </div>
        </div>
    );
}


// Exports the authentication component
export default Auth;
