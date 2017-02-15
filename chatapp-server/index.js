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
const authRouter = require('./routes/auth.route')(express);
app.use(config.ENDPOINTAPI, authRouter);
//USE MIDDLEWARE BETWEEN ROUTEES
const authMiddleware = require('./middlewares/auth.middleware');
app.use(authMiddleware.checkToken);
const userRouter = require('./routes/user.route')(express);
app.use(config.ENDPOINTAPI, userRouter);
const roomRouter = require('./routes/room.route')(express);
app.use(config.ENDPOINTAPI, roomRouter);
const chatRouter = require('./routes/chat.route')(express);
app.use(config.ENDPOINTAPI, chatRouter);
//RUNNING
app.listen(config.PORT, () => {
  console.log('SERVER RUNNING');
});
