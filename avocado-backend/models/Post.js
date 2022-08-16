const mongoose = require('mongoose');
const helpers = require('../helpers.js')



//schema
const postSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Export Post Model
const Post = mongoose.model('post', postSchema);

Post.add = async function (req, res) {
    const post = new Post();
    post.text = req.body.text;
    post.user_id = req.body.user_id
    

    //Save and check error
    post.save(function (err) {
        if (err)
            return res.json(err);

        res.json({
            message: "New Post Added!",
            data: post
        });
    });
};

Post.getUserPosts = async function (req, res) {
    const user_id = req.params.user_id
    
    const posts = await Post.find({ 'user_id': { $in: user_id } }).sort([['created_at', 'descending']]).then((it) => {
            return it
        })

        res.json({
            data: posts
        })
    
};
module.exports = Post;