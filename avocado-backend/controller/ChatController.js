const router = require('express').Router();

//Import Bio Controller
const chatController = require('../models/Chat');


router.route('/chat')
    .get(chatController.index)
    .post(chatController.add);
    

 router.route('/chat/:id')
    .get(chatController.getById)


    
module.exports = router;