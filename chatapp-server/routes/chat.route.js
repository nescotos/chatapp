const ChatController = require('../controllers/chat.controller');

module.exports = (express) => {
  let chatRouter = express.Router();

  chatRouter.route('/chat/room/:id')
  .get(ChatController.getAllChatsFromRooms)
  .post(ChatController.sendChat);

  chatRouter.route('/chat/room/:id/search')
  .get(ChatController.searchChats);

  return chatRouter;
};
