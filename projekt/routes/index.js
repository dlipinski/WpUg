const express = require('express');
const router = express.Router();
const moment = require('moment');

const AuctionModel = require('../models/Auction'); 

const isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('pages/index', { message: req.flash('message') });
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
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	/* GET new auction Page */
	router.get('/newAuction', function(req, res){
		res.render('pages/newAuction',{message: req.flash('message')});
	});

	/* Handle new auction POST */
	router.post('/newAuction', passport.authenticate('signup', {
		successRedirect: '/account',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	return router;
}