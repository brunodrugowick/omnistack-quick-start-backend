require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
});

app.use((req, res, next) => {
    req.io = io;

    next();
})

app.use(cors());

app.use(express.urlencoded());

app.use(require('./routes'));

server.listen(process.env.PORT || 3333, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
