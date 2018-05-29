const express = require('express');
const router = express.Router();

const auction_controller = require('../controllers/auctionController');
const isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}
module.exports = function(passport){

	/* GET new auction Page */
	router.get('/auction/:id', auction_controller.auction_detail);

	/* GET new auction Page */
	router.get('/myAuctions', isAuthenticated,auction_controller.auction_list_user);

	/* GET new auction Page */
	router.get('/newAuction',isAuthenticated, auction_controller.auction_create_get);

	/* Handle new auction POST */
	router.post('/newAuction', isAuthenticated, auction_controller.auction_create_post);	

	router.post('/findAuctions',  auction_controller.auction_list_find);	
	return router;
}