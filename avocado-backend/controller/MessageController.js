const router = require('express').Router();

//Import Bio Controller
const messageController = require('../models/Message');


router.route('/message')
    .get(messageController.index)
    .post(messageController.add);
    

    
module.exports = router;