//initialize express router
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helpers = require('../helpers.js');
const Bio = require('../models/Bio');



//set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to FirstRest API'
    });
});

//Import Bio Controller
const bioController = require('../models/Bio');

// Bio routes
router.route('/bio')
    .get(bioController.index)
    .post(bioController.add);

router.route('/userInfo')
    .get(bioController.getInfo)


router.route('/bio/:bio_id')
    .get(bioController.getById)
    .patch(bioController.photoUpdate)
    .put(bioController.update)
    .delete(bioController.delete);

/**
 * https://dev.to/eidorianavi/authentication-and-jwt-in-node-js-4i13
 */
router.post('/login', async (req, res) => {
    const user = await bioController.findOne({ email: req.body.email });
    if (user == null) {
        return res.status(404).send({
            message: 'такого пользователя не существует'
        });
    }

    try {
        const match = await bcrypt.compare(req.body.password, user.password);
        
        
        const accessToken = jwt.sign(JSON.stringify(user), helpers.KEY);
        if (match) {
            
            await res.json({ accessToken: accessToken , data: helpers.destruct(user._doc)});
        } else {
            return res.status(401).send({
                message: 'неправильный пароль'
            })
        }
    } catch (e) {
        console.log(e)
    }
});

//Export API routes
module.exports = router;
