//IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
//DATABASE
mongoose.connect(config.DATABASE.HOST + config.DATABASE.NAME);
mongoose.connection.on('connected', () => {
  console.log('MONGODB CONNECTION SUCCESS');
});
mongoose.Promise = global.Promise;
//SERVER
const app = express();
//CONFIGS
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//ROUTES
const userRouter = require('./routes/user')(express);
app.use('/api', userRouter);
//RUNNING
app.listen(config.PORT, () => {
  console.log('SERVER RUNNING')
});
