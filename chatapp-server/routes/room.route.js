const RoomController = require('../controllers/room.controller');

module.exports = (express) => {
  let roomRouter = express.Router();
  roomRouter.route('/room')
  .get(RoomController.getRooms)
  .post(RoomController.createRoom);

  return roomRouter;
}
