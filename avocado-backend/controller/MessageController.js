const router = require('express').Router();

//Import Bio Controller
const messageController = require('../models/Message');


router.route('/message')
    
    .post(messageController.add);
    
router.route('/message/:dialogue_id')
    .get(messageController.index)


module.exports = router;