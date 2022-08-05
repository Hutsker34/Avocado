const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helpers = require('../helpers.js')



//schema
const bioSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
bioSchema.index({ "email": 1 }, { unique: true } );

// Export Bio Model
const Bio = mongoose.model('bio', bioSchema);

Bio.get = function (callback, limit) {
    Bio.find(callback).limit(limit);
};

Bio.index = function (req, res) {
    Bio.get(function (err, bio) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Bio Successfully!",
            data: bio.map(el => helpers.destruct(el._doc))
        });
    });
};

Bio.getById = function (req, res) {
    // https://mongoosejs.com/docs/api.html#model_Model.findById
    Bio.findById(req.params.bio_id, function (err, bio) {
        if (err)
            res.send(err);
        res.json({
            message: 'Bio Details',
            data: bio
        });
    });
};

Bio.getInfo = function (req, res) {
    console.log(helpers.getUserId)
    // https://mongoosejs.com/docs/api.html#model_Model.findById
    Bio.findById(helpers.getUserId(req), function (err, bio) {
        if (err)
            res.send(err);
        res.json({
            message: 'Bio Details',
            data: helpers.destruct(bio._doc)
        });
    });
};

Bio.add = async function (req, res) {
    const bio = new Bio();
    const accessToken = jwt.sign(JSON.stringify(bio), helpers.KEY);
    bio.name = req.body.name ? req.body.name : bio.name;
    bio.email = req.body.email;
    bio.password = await bcrypt.hash(req.body.password, 10);
    

    //Save and check error
    bio.save(function (err) {
        if (err)
            return res.json(err);

        res.json({
            message: "New Bio Added!",
            data: helpers.destruct(bio._doc),
            accessToken: accessToken,
        });
    });
};

Bio.update = function (req, res) {
    Bio.findById(req.params.bio_id, function (err, bio) {
        if (err)
            res.send(err);
        bio.name = req.body.name ? req.body.name : bio.name;
        bio.email = req.body.email;

        //save and check errors
        bio.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Bio Updated Successfully",
                data: bio
            });
        });
    });
};

Bio.delete = function (req, res) {
    Bio.deleteOne({
        _id: req.params.bio_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Bio Deleted'
        });
    });
};

module.exports = Bio;
