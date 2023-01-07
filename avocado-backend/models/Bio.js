const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helpers = require("../helpers.js");
const fs = require("fs");
const path = require("path");
const getColors = require('get-image-colors')



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
  background: {
    type: String,
    default: "black",
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
  Bio.findById(helpers.getUserId(req)._id, function (err, bio) {
    if (err) res.send(err);
    if (bio == null) return res.status(404).json({
      status: "Fail",
      message: "user не найден(",
    });
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
  bio.background = req.body.background;

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
    bio.background = req.body.background;
    

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

Bio.photoUpdate = async function (req, res) {
  const files = req.files;
  if (!files.files.length) {
    //Single file

    const file = files.files;
    console.log(file)
    // checks if the file is valid
    const isValid = (file) => {
      const type = file.type.split("/").pop();
      const validTypes = ["jpg", "jpeg", "png", "pdf"];
      if (validTypes.indexOf(type) === -1) {
        return false;
      }
      return true;
    };

    // creates a valid name by removing spaces
    const fileName = encodeURIComponent(
      helpers.transliterate(file.name).replace(/\s/g, "-")
    );
    const uploadFolder = path.join(
      __dirname,
      "../photos"
    );
    
    if (!isValid) {
      // throes error if file isn't valid
      return res.status(400).json({
        status: "Fail",
        message: "The file type is not a valid type",
      });
    }
    try {
      // renames the file in the directory
      fs.renameSync(file.path, path.join(uploadFolder, fileName));
    } catch (error) {
      console.log(error);
    }
      
      Bio.findById(req.params.bio_id, function (err, bio) {
        if (err) return  res.send(err);
        bio.avatar = fileName;
        
          getColors(path.join(uploadFolder, fileName)).then(colors => {
            bio.background = helpers.getContrastYIQ(colors[0].css())
            bio.save(function (err) {
              if (err) return res.json(err);
              return res.json({
                message: "Bio Updated Successfully",
                data:  bio,
              });
            });
          }).catch(error => {
            console.log(error)
            res.json({
              error,
            });
          })
        });
    } 
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
