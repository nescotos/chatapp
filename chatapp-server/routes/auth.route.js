const UserController = require('../controllers/user.controller');

module.exports = (express) => {
  let authRouter = express.Router();
  authRouter.post('/user', UserController.createUser);
  authRouter.post('/login', UserController.login);
  return authRouter;
};
