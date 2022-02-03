// import express module
const express = require('express');

// import signup and login facilities from controllers
const { signup, login } = require('../controllers/auth.js');

// import router from express
const router = express.Router();

// both of the routes are post-routes 
// beacuse these can send payloads from frontend to backend
router.post('/signup', signup);
router.post('/login', login);

// export post-routes
module.exports = router;
