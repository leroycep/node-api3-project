const express = require('express');

const userRouter = require("./users/userRouter.js");

const server = express();

//custom middleware
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', userRouter);

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
}

module.exports = server;
