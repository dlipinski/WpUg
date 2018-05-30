//jshint browser: true, esversion: 6, node: true
const Chat = require('../models/chat.js');
const Message = require('../models/message.js');
const User = require('../models/user.js');
const moment = require('moment');

// Display list of all chats.
exports.chat_user_list = (req, res) => {
    Chat.find({"users": req.user.id})
    .populate('users')
    .exec(function (err, list_chats) {
		if (err) {return; }
		res.render('pages/chats', { chats: list_chats, message: req.flash('message') , moment, req });
	});
};

// Display list of all chats.
exports.go_to_messanger = (req, res) => {
    Chat.find({"_id": `ObjectId("${req.params.id}")`},{"messages":1, _id:0})
    .populate('messages')
    .exec(function (err, messages) {
		if (err) {return; }
		res.render('pages/chat', { messages: messages, message: req.flash('message') , moment, user_id: req.user.id });
	});
};

// Handle Chat create on POST.
exports.chat_create_post = function(req, res) {
    let newChat = new Chat();
    let anotherUserId = req.body.user_id;
    newChat.users.push(req.user.id,anotherUserId);
    let newMessage = new Message();
    newMessage.From = req.user.id;
    newMessage.content = `Hi! I'm contacting you in interest of auction "${req.body.title}"`;

	try{
        newMessage.save();
        newChat.messages.push(newMessage);
        newChat.save();
        console.log('----------------------------\n'+newChat._id+'\n----------------\n');
		res.redirect(`/chat/${newChat._id}`);
	}catch(err) { // Something went wrong
		//console.log(err);
		res.render(req.get('referer'),{message: "Can't create a chat now. Please try in few minutes."});
	}
};