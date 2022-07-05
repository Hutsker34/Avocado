const Bio = require("./Bio");


function ChatUser(){}

// Get user subscriptions & public articles (for auth-users only)
ChatUser.getUserArticles = function (ids) {
    console.log(ids)
    return Bio
        .find( {'_id': {$in: ids.map(it => it._id)}})
};

module.exports = ChatUser; 