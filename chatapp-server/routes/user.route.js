const UserController = require('../controllers/user.controller');

module.exports = (express) => {
  let userRouter = express.Router();
  userRouter.route('/user')
  .get(UserController.getUsers);
  userRouter.route('/user/:id')
  .get(UserController.getSpecificUser);
  userRouter.route('/me')
  .get(UserController.me);
  return userRouter;
};
