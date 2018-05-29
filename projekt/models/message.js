const User = require('../models/user.js');

const mongoose = require('mongoose'), Schema = mongoose.Schema;

const MessageSchema = mongoose.Schema({
    From: {type: Schema.Types.ObjectId, ref: 'User'},
    Content: String,
    Date: { type: Date, default: Date.now },
    Seen: { type: Boolean, default: false }
});

module.exports = mongoose.model('Message',MessageSchema);