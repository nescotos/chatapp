const Room = require('../models/room.model');
const config = require('../config');

var roomCtrl = {
  createRoom: (req, res) => {
    let room = new Room();
    room.name = req.body.name;
    if(req.body.description){
      room.description = req.body.description;
    }
    room.admins.push(req.decoded.id);
    room.members.push(req.decoded.id);
    room.save((err) => {
      if(err){
        if(err.code == 11000){
          return res.json({status: false, message: 'Chatname already exists, try with another one!'});
        }
        return res.json(config.GENERICERROR);
      }
      res.json({status: true, message: 'Room succesfuly created'});
    });
  },
  getRooms: (req, res) => {
    Room.find({}, (err, rooms) => {
      if(err){
        return res.json(config.GENERICERROR);
      }
      res.json(rooms);
    })
  }
}

module.exports = roomCtrl;
