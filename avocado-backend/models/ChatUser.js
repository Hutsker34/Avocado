const Bio = require("./Bio");


function ChatUser(){}



// Get user subscriptions & public articles (for auth-users only)
ChatUser.getUsersByIds = function (ids) {
    return Bio
        .find({'_id': {$in: ids}}).then((it) => {
            return it.reduce((total, item) => {
                total[item._id] = item;
                return total;
            }, {});
        })
};

module.exports = ChatUser; 