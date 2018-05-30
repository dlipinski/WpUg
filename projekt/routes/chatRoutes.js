//jshint browser: true, esversion: 6, node: true
const express = require('express');
const router = express.Router();

const chat_controller = require('../controllers/chatController');

const isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated()){
        return next();
    }
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}
module.exports = function(passport){

    /* GET user chats Page */
    router.get('/chats',/* isAuthenticated,*/ chat_controller.chat_user_list);
    router.post('/chat',/* isAuthenticated,*/ chat_controller.chat_create_post);
    router.get('/chat/:id',/* isAuthenticated,*/ chat_controller.go_to_messanger);
    return router;
};