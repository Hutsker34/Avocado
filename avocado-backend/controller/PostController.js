const router = require('express').Router();

//Import Bio Controller
const postController = require('../models/Post');


router.route('/post')
    .post(postController.add);
    
router.route('/post/:user_id')
    .get(postController.getUserPosts);


    
module.exports = router;