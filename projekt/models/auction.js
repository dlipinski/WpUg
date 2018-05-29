var mongoose = require('mongoose');
 
module.exports = mongoose.model('Auction',{
    isBuyNow: Boolean,
    title: String,
    description: String,
    photo: String,
    price: Number,
    startDate: { type: Date, default: Date.now },
    endDate:  { type: Date, default: Date.now }
});