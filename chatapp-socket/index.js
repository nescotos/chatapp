//IMPORTS
const express = require('express');
const cors = require('cors');
const config = require('./config');
//SERVER
const app = express();
//CONFIG
app.use(cors());
//RUNNING
const server = app.listen(config.PORT, () => {
  console.log('SOCKET SERVER RUNNING');
});
const io = require('socket.io')(server);
