const express = require('express');
const router = express.Router();
const moment = require('moment');
const auction_controller = require('../controllers/auctionController');

module.exports = function(passport){

	/* GET Home page. */
	router.get('/', function(req, res) {
		auction_controller.auction_list_recent(req,res);
	});
	
    router.get('/login', function(req, res) {
		if (req.user) {res.redirect('/');}
    	// Display the Login page with any flash message, if any
		res.render('pages/login', { message: req.flash('message') });
	});
	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: 'login',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('pages/register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/account',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/account', isAuthenticated, function(req, res){
		res.render('pages/account', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', isAuthenticated, function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	router.get('/chats', /*isAuthenticated,*/ function(req, res) {
		res.render('pages/chats', {user: req.user});
	});
	router.get('/chat',/* isAuthenticated, */function(req, res) {
		res.render('pages/chat', {user: req.user});
	});
	return router;
}

const isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}