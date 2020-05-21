const express = require("express");
const helmet = require('helmet');
const bookRouter = require("./books/booksRouter");
const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "Is loaded and ready to go!" });
});

server.use('/api/books', bookRouter);

module.exports = server;
