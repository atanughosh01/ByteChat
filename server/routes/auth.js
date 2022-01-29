 // import express module
 const express = require('express');

 // import signup and login facilities from controllers
 const { signup, login } = require('../controllers/auth.js');
 
 // import router from express
 const router = express.Router();
 
 // Both of these routes are going to be post-routes
 // bcz only post-routes can send payloads from frontend to the backend
 router.post('/signup', signup);
 router.post('/login', login);
 
 // export router
 module.exports = router;
 