const express = require('express');

const server = express();

const usersRouter = require('./users/users-router')

const { logger } = require('./middleware/middleware')


// remember express by default cannot parse JSON in request bodies

server.use(express.json())

// global middlewares and the user's router need to be connected here
// server.use(logger)

server.use('/users', logger, usersRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: 'something has gone wrong, please investigate'
  })
})

module.exports = server;
