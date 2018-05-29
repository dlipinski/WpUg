
const Auction = require('../models/auction.js');
var moment = require('moment');

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
	let regex = RegExp(`/.*${req.body.phrase}.*/ `);
	var query = { title: new RegExp('^' + req.body.phrase) };
	Auction.find(query)
	.sort({'dateEnd': -1})
	.limit(100)
    .exec(function (err, list_auctions) {
		if (err) {/* return next(err);*/ }
		res.render('pages/index', { auctions: list_auctions,message: req.flash('message'),  moment: moment });
	});
};
// Display detail page for a specific Auction.
exports.auction_detail = function(req, res) {
	var query = { _id: req.params.id };
	Auction.findOne(query)
    .exec(function (err, auction) {
		if (err) {/* return next(err);*/ }
		res.render('pages/auction', { auction: auction,message: req.flash('message') ,  moment: moment});
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
		console.log(err);
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

