const RoomController = require('../controllers/room.controller');

module.exports = (express) => {
  let roomRouter = express.Router();
  roomRouter.route('/room')
  .get(RoomController.getRooms)
  .post(RoomController.createRoom);

  roomRouter.route('/room/:id')
  .get(RoomController.getSpecificRoom)
  .put(RoomController.updateRoom)
  .delete(RoomController.deleteRoom);

  roomRouter.route('/room/:id/join')
  .post(RoomController.joinRoom);

  roomRouter.route('/room/:id/leave')
  .post(RoomController.leaveRoom);

  roomRouter.route('/rooms/:id')
  .get(RoomController.getRoomsByUser);

  roomRouter.route('/room/:id/upgrade')
  .post(RoomController.upgradeToAdmin);

  roomRouter.route('/room/:id/downgrade')
  .post(RoomController.removeToAdmin);

  roomRouter.route('/room/:id/ban')
  .post(RoomController.ban);

  roomRouter.route('/room/:id/unban')
  .post(RoomController.unban);

  return roomRouter;
};
