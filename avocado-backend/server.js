const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.set('useCreateIndex', true);

const app = express();
const port = 3001;
/**
 * https://medium.com/wesionary-team/create-your-first-rest-api-with-node-js-express-and-mongodb-447fce535385
 * @type {string}
 */
const dbPath = 'mongodb://localhost/Avocado';
const options = {useNewUrlParser: true, useUnifiedTopology: true};
const mongo = mongoose.connect(dbPath, options);

const apiRoutes = require('./controller/UserController');

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

app.listen(port);