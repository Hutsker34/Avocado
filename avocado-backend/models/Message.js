const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helpers = require('../helpers.js')
const Chat = require('./Chat.js')



//schema
const messageSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    sender_id: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }

});

// Export Message Model
const Message = mongoose.model('message', messageSchema);

Message.get = function (callback, limit) {
    Message.find(callback).limit(limit);
};

Message.add = async function (req, res) {
    const message = new Message();
    const dialogueId = req.body.dialogue_id
    message.sender_id = req.body.sender_id
    message.text = req.body.text
    message.save(function (err) {
        if (err)
            return res.json(err);

        Chat.findById(dialogueId, function (err, chat) {
            if (err)
                return res.send(err);
            chat.messages = [...chat.messages, message._id]
            chat.save(function (err) {
                if (err)
                    return res.json(err);
                res.json({
                    message: "New Message Added!",
                    data: message,

                });
            })
        });
    });
};


Message.getById = function (req, res) {
    console.log(req.params)
    // https://mongoosejs.com/docs/api.html#model_Model.findById
    Message.findById(req.params.id, function (err, message) {
        console.log(err, message)
        if (err)
            return res.send(err);
        res.json({
            message: 'Bio Details',
            data: message
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

Message.getUsersByIds = function (ids) {
    return Message
        .find({ '_id': { $in: ids } }).then((it) => {
            return it
        })
};

module.exports = Message;