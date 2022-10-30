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

function destruct(obj){
    const {password ,__v , created_at , ...rest} = obj
    return rest
}

const a = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"А","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};

function transliterate(word){
  return word.split('').map(function (char) { 
    return a[char] || char; 
  }).join("");
}

exports.getUserId = getUserId
exports.KEY = KEY
exports.destruct = destruct
exports.transliterate = transliterate