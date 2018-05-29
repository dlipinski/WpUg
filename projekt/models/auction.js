const User = require('../models/user.js')
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const AuctionSchema = mongoose.Schema({
    createtor: String,
    isBuyNow: Boolean,
    title: String,
    description: String,
    photo: String,
    price: Number,
    startDate: { type: Date, default: Date.now },
    endDate:  { type: Date, default: Date.now },
    auctioneers: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

module.exports = mongoose.model('Auction',AuctionSchema);