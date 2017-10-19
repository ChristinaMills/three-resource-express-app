const express = require('express');
const router = express.Router();
//eslint-disable-next-line
const jsonParser = require('body-parser').json();
const Actor = require('../models/actor');

router 

    .post('/', (req, res, next) => {
        new Actor(req.body).save()
            .then(actor => res.json(actor))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Actor.find()
            .then(actor => res.json(actor))
            .catch(next);
    })

    .get('/:id', (req, res) => {
        Actor.findById(req.params.id)
            .then(actor => {
                if(!actor) {
                    res.statusCode = 404;
                    res.send(`id: ${res.params.id} does not exist`);
                }
                else res.json(actor);
            });
    });

module.exports = router;
