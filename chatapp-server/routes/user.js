const UserController = require('../controllers/user.controller');

module.exports = (express) => {
  let userRouter = express.Router();
  userRouter.route('/user')
  .get(UserController.getUsers)
  .post(UserController.createUser);

  userRouter.route('/user/:id')
  .get(UserController.getSpecificUser);

  userRouter.post('/login', UserController.login);

  return userRouter;
}
