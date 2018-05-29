const User = require('../models/auction.js')
const mongoose = require('mongoose'), Schema = mongoose.Schema;
 
const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    address: String,
    auctions: [{type: Schema.Types.ObjectId, ref: 'Auction'}]
});

module.exports = mongoose.model('User',UserSchema);