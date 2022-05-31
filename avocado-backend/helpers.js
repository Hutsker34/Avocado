const jwt = require('jsonwebtoken');
const KEY = 'HSJDKVYFJFU'

const getUserId = (req) => {
    let token = ''
    try{
        const authHeader = req.headers.authorization;
        token = authHeader.split(': ')[1];
    } catch(error){
        console.log(error)
    }
    return jwt.verify(token, `${KEY}`);
};

exports.getUserId = getUserId
exports.KEY = KEY