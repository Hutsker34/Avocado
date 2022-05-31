const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helpers = require('../helpers.js')



//schema
const chatSchema = mongoose.Schema({
    messages: {
        type: [String],
        default: []
    },
    sender_id: {
        type: String,
        required: true
    },
    receiver_id: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Export Chat Model
const Chat = mongoose.model('chat', chatSchema);


Chat.add = async function (req, res) {
    const chat = new Chat();
    chat.sender_id = req.body.sender_id
    chat.receiver_id = req.body.receiver_id

    //Save and check error
    chat.save(function (err) {
        if (err)
            return res.json(err);

        res.json({
            message: "New Chat Added!",
            data: chat,
            
        });
    });
};


module.exports = Chat;
