const router = require('express').Router();
const formidableMiddleware = require('express-formidable');
//Import Bio Controller
const bioController = require('../models/Bio');


router.route('/photo')
    .post(formidableMiddleware(),bioController.photoUpdate);
    



    
module.exports = router;