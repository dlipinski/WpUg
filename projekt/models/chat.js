const Message = require('../models/message.js');
const User = require('../models/user.js');

const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ChatSchema = mongoose.Schema({
    users:  [{type: Schema.Types.ObjectId, ref: 'User'}],
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
})

module.exports = mongoose.model('Chat',ChatSchema);