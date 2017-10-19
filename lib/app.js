const express = require('express');
const app = express();
//eslint-disable-next-line
const bodyParser = require('body-parser');
const morgan =require('morgan');
const errorHandler = require('./utils/error-handler');


// const createAuth = require('./utils/cathentication');

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(bodyParser.json());

const actors = require('./routes/actors');
app.use('/api/actors', actors);

app.use(errorHandler());

//eslint-disable-next-line
app.use((req, res, next) => {
    res.send('wrong path');
});

module.exports = app;