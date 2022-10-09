const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helpers = require("../helpers.js");


//schema
const bioSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
    default: "",
  },
});
bioSchema.index({ email: 1 }, { unique: true });

// Export Bio Model
const Bio = mongoose.model("bio", bioSchema);

Bio.get = function (callback, limit) {
  Bio.find(callback).limit(limit);
};

Bio.index = function (req, res) {
  const userId = helpers.getUserId(req)._id;
  Bio.get(function (err, bio) {
    if (err)
      res.json({
        status: "error",
        message: err,
      });
    res.json({
      status: "success",
      message: "Got Bio Successfully!",
      data: bio
        .filter((el) => el._id.toString() !== userId)
        .map((el) => helpers.destruct(el._doc)),
    });
  });
};

Bio.getById = function (req, res) {
  // https://mongoosejs.com/docs/api.html#model_Model.findById
  Bio.findById(req.params.bio_id, function (err, bio) {
    if (err) res.send(err);
    res.json({
      message: "Bio Details",
      data: bio,
    });
  });
};

Bio.getInfo = function (req, res) {
  // https://mongoosejs.com/docs/api.html#model_Model.findById
  Bio.findById(helpers.getUserId(req), function (err, bio) {
    if (err) res.send(err);
    res.json({
      message: "Bio Details",
      data: helpers.destruct(bio._doc),
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
    if (err) return res.json(err);

    res.json({
      message: "New Bio Added!",
      data: helpers.destruct(bio._doc),
      accessToken: accessToken,
    });
  });
};

Bio.update = function (req, res) {
  Bio.findById(req.params.bio_id, function (err, bio) {
    if (err) res.send(err);
    bio.name = req.body.name ? req.body.name : bio.name;
    bio.email = req.body.email;

    //save and check errors
    bio.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "Bio Updated Successfully",
        data: bio,
      });
    });
  });
};
Bio.photoUpdate = function (req, res) {
  console.log(req.files);
  res.json({ mesg: "OK!" });
  // Bio.findById(req.params.bio_id, function (err, bio) {
  //   if (err) res.send(err);
  //   //console.log(req);
  //   console.log('file', req.file)
  //   const myFile = req.files.file;
  //   myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).send({ msg: "Error occured" });
  //     }
  //     bio.userPhoto = req.body.userPhoto;
  //     bio.save(function (err) {
  //       if (err) res.json(err);
  //       res.json({
  //         message: "Bio Updated Successfully",
  //         data: bio,
  //       });
  //     });
  //     //save and check errors
  //   });
  // });
};
Bio.delete = function (req, res) {
  Bio.deleteOne(
    {
      _id: req.params.bio_id,
    },
    function (err, contact) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Bio Deleted",
      });
    }
  );
};

module.exports = Bio;
