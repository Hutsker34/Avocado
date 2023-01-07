const mongoose = require("mongoose");
const helpers = require("../helpers.js");

//schema
const avatarSchema = mongoose.Schema({
  avatarId: {
    type: String,
    default: ""
  },
  background: {
    type: String,
    default: ""
  },
  img: {
    type: String,
    default: ""
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Export Avatar Model
const Avatar = mongoose.model("avatar", avatarSchema);

Avatar.add = async function (req, res) {
  const avatar = new Avatar();
  avatar.avatarId = req.body.avatarId;
  avatar.background = helpers.getContrastColor()
  //Save and check error
  avatar.save(function (err) {
    if (err) return res.json(err);
    
    res.json({
      message: "New Avatar Added!",
      data: avatar,
    });
  });
};
Avatar.update = function (req, res) {
  Avatar.findById(req.params.avatar_id, function (err, avatar) {
    if (err) res.send(err);
    avatar.avatarId = req.body.avatarId;
    //save and check errors
    avatar.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "Avatar Updated Successfully",
        data: avatar,
      });
    });
  });
};

module.exports = Avatar;
