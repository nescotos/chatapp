//IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
//SERVER
const app = express();
//CONFIGS
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//RUNNING
app.listen(config.PORT, () => {
  console.log('SERVER RUNNING')
});
