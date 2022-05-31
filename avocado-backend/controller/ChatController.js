const router = require('express').Router();

//Import Bio Controller
const chatController = require('../models/Chat');


router.route('/chat')
    .post(chatController.add);

module.exports = router;