const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

const Leaders = require('../models/leaders');

leaderRouter.route('/')
    .get((req, res, next) => {
        Leaders.find({})
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leaders);
            }, (err) => next(err))
            .catch((err) => next(err))

    })
    .post((req, res, next) => {
        Leaders.create(req.body)
            .then((leader) => {
                console.log("Leader Created: ", leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader)
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation now supported on /leaders')
    })
    .delete((req, res, next) => {
        Leaders.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


// leaderRouter.route('/:dishId')
//     .all((req, res, next) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');

//         next();
//     })
//     .get((req, res, next) => {
//         res.end('Will send details of the leader: ' + req.params.dishId + ' to you!');
//     })
//     .post((req, res, next) => {
//         res.statusCode = 403;
//         res.end('POST operation not supported on /leaders/' + req.params.dishId);
//     })
//     .put((req, res, next) => {
//         res.write('Updaing the leader ' + req.params.dishId + '\n');
//         res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
//     })
//     .delete((req, res, next) => {
//         res.end('Deleting leader: ' + req.params.dishId);
//     });

module.exports = leaderRouter;