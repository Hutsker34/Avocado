const jwt = require('jsonwebtoken');
const KEY = 'HSJDKVYFJFU'

const getUserId = (req) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(': ')[1];

    return jwt.verify(token, `${KEY}`);
};

exports.getUserId = getUserId
exports.KEY = KEY