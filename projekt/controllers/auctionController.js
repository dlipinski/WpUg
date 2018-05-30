//jshint browser: true, esversion: 6, node: true
const Auction = require('../models/auction.js');
const User = require('../models/user.js');
const moment = require('moment');

// Display list of all Auction.
exports.auction_list = (req, res) => {
    Auction.find()
    .exec(function (err, list_auctions) {
		if (err) {/* return next(err);*/ }
		res.render('pages/index', { auctions: list_auctions,message: req.flash('message') ,  moment: moment });
	});
};
// Display list of all Auction.
exports.auction_list_recent = function(req, res) {
	Auction.find()
	.sort({'dateEnd': -1})
	.limit(100)
    .exec(function (err, list_auctions) {
		if (err) {/* return next(err);*/ }
		res.render('pages/index', { auctions: list_auctions,message: req.flash('message'),  moment: moment });
	});
};
// Display list of all Auction.
exports.auction_list_find = function(req, res) {
	var query = { title: {$regex : `.*${req.body.phrase}.*`}};
	Auction.find(query)
	.sort({'dateEnd': -1})
	.limit(100)
    .exec(function (err, list_auctions) {
		if (err) {/* return next(err);*/ }
		res.render('pages/index', { auctions: list_auctions,message: req.flash('message'),  moment: moment });
	});
};
exports.auction_list_user = function(req, res) {
	var query = { _id: req.user.id };
	User.find(query, {auctions:1, _id:0})
	.populate('auctions')
	.exec(function (err, list_auctions) {
		if (err) {/* return next(err);*/ }
		res.render('pages/index', { auctions: list_auctions[0].auctions,message: req.flash('message'),  moment: moment });
	});

};
// Display detail page for a specific Auction.
exports.auction_detail = function(req, res) {
	let userQuery = { "auctions": req.params.id};
	let auctionQuery = { _id: req.params.id };
	User.findOne(userQuery)
	.exec(function (err, user) {
		Auction.findOne(auctionQuery)
		.exec(function (err, auction) {
			if (err) {/* return next(err);*/ }
			res.render('pages/auction', { auction: auction,user:user,message: req.flash('message') ,  moment: moment});
		});
	});
	
	
};

// Display Auction create form on GET.
exports.auction_create_get = function(req, res) {
    res.render('pages/newAuction',{message: req.flash('message'),  moment: moment});
};

// Handle Auction create on POST.
exports.auction_create_post = function(req, res) {
    let newAuction = new Auction();
	let reqBody = req.body;
	if(reqBody.isBuyNow === 'on'){
		newAuction.isBuyNow = true;
	} else {
		newAuction.isBuyNow = false;
	}
	newAuction.title = reqBody.title.trim();
	newAuction.description = reqBody.description.trim();
	newAuction.photo = reqBody.photo.trim();
	newAuction.price = reqBody.price;
	newAuction.endDate = new Date(reqBody.endDate).setHours(23);
	try{
		const saveResult =  newAuction.save();
		req.user.auctions.push(newAuction);
		req.user.save();
		res.redirect('/');
	}catch(err) { // Something went wrong
		//console.log(err);
		res.render('pages/newAuction',{message: req.flash('message')});
	}
};

// Display Auction delete form on GET.
exports.auction_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: auction delete GET');
};

// Handle Auction delete on POST.
exports.auction_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: auction delete POST');
};

