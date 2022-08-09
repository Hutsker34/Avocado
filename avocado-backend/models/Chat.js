const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helpers = require('../helpers.js')
const ChatUser = require('./ChatUser.js')



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

Chat.get = function (callback, limit) {
    Chat.find(callback).limit(limit);
};

Chat.add = async function (req, res) {
    const chat = new Chat();
    chat.sender_id = req.body.sender_id
    chat.receiver_id = req.body.receiver_id

    Chat.find({
        $and: [{ 'receiver_id': req.body.receiver_id }, { 'sender_id': req.body.sender_id }]
    }, function (err, data) {
        console.log(err, data)
        if (err) {
            return res.json({
                status: "error",
                message: err
            });
        }
        if (data.length > 0) {
            
            return res.json({
                status: "success",
                data: data[0]
            })
        } else {
            chat.save(function (err) {
                if (err)
                    return res.json(err);

                res.json({
                    message: "New Chat Added!",
                    data: chat,

                });
            });
        }
    })
};

Chat.getById = function (req, res) {
    
    // https://mongoosejs.com/docs/api.html#model_Model.findById
    Chat.findById(req.params.id, function (err, chat) {
        console.log(err, chat)
        if (err)
            return res.send(err);
        res.json({
            message: 'Bio Details',
            data: chat
        });
    });
};

Chat.index = function (req, res) {
    const userId = helpers.getUserId(req)
    Chat.find({
        'sender_id': userId 
    }, async function (err, chats) {
        if (err)
            return res.json({
                status: "error",
                message: err
            });
        const userData = await ChatUser.getUsersByIds(chats.map((item) => {
            return item.receiver_id
        }))
        res.json({
            status: "success",
            message: "Got chat Successfully!",
            data: chats.map((chat) => {
                return {
                    ...chat._doc,
                    user: userData[chat.receiver_id]
                }
            })
        });
    });
};


module.exports = Chat;
