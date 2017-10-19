const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const createAuth = require('./utils/cathentication');

app.use(createAuth('meow'));

app.use((req, res, next) => {
    if(req.query.whatever) {
        res.send('you found the secret whatever handler');
    }
    else {
        next();
    }
});

app.get('/pirates', (req, res, next) => {
    next();
});

// eslint-disable-next-line
app.use((req, res, next) => {
    res.send('hel world');
});

module.exports = app;