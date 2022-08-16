const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3006;
/**
 * https://medium.com/wesionary-team/create-your-first-rest-api-with-node-js-express-and-mongodb-447fce535385
 * @type {string}
 */
const dbPath = 'mongodb://localhost/Avocado';
const options = {useNewUrlParser: true, useUnifiedTopology: true};
const mongo = mongoose.connect(dbPath, options);
mongoose.set('useCreateIndex', true);

const apiRoutes = require('./controller/UserController');
const chatRoutes = require('./controller/ChatController');
const messageRoutes = require('./controller/MessageController');
const postRoutes = require('./controller/PostController')

mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
});
const db = mongoose.connection;


//Check DB Connection
if (!db)
    console.log("Error connecting db");
else
    console.log("DB Connected Successfully");

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);
app.use('/api', chatRoutes);
app.use('/api', messageRoutes);
app.use('/api', postRoutes);
app.listen(port);