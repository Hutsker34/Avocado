const router = require('express').Router();
const formidableMiddleware = require('express-formidable');
//Import Bio Controller
const bioController = require('../models/Bio');


router.route('/photo/:bio_id')
    .post(formidableMiddleware(),bioController.photoUpdate);
    



    
module.exports = router;