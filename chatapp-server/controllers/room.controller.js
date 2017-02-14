const Room = require('../models/room.model');
const User = require('../models/user.model');
const config = require('../config');

var roomCtrl = {
	createRoom: (req, res) => {
		let room = new Room();
		room.name = req.body.name;
		if (req.body.description) {
			room.description = req.body.description;
		}
		room.admins.push(req.decoded.id);
		room.members.push(req.decoded.id);
		room.save((err) => {
			if (err) {
				if (err.code == 11000) {
					return res.json({
						status: false,
						message: 'Chatname already exists, try with another one!'
					});
				}
				return res.json(config.GENERICERROR);
			}
			User.findById(req.decoded.id, (err, user) => {
				if (err) {
					return res.json(config.GENERICERROR);
				}
				user.rooms.push(room.id);
				user.save((err) => {
					if (err) {
						return res.json(config.GENERICERROR);
					}
					res.json({
						status: true,
						message: 'Room succesfuly created'
					});
				});
			});
		});
	},
	getRooms: (req, res) => {
		let page;
		if (!req.query.page || req.query.page < 2) {
			page = 1;
		} else {
			page = req.query.page;
		}
		let options = {
			select: '_id name description bannerPicture',
			page: page,
			limit: config.ROOMSPAGINATION
		};
		Room.paginate({}, options).then((result) => {
			res.json({
				status: true,
				page: result.page,
				rooms: result.docs
			});
		});
	},
	updateRoom: (req, res) => {
		Room.findById(req.params.id, (err, room) => {
			if (err) {
				return res.json(config.GENERICERROR);
			}
			room.name = req.body.name || room.name;
			room.description = req.body.description || room.description;
			room.save((err) => {
				if (err) {
					return res.json(config.GENERICERROR);
				}
				res.json({
					status: true,
					message: 'Room updated succesfully'
				});
			});
		});
	},
	getSpecificRoom: (req, res) => {
		Room.findById(req.params.id, (err, room) => {
			if (err) {
				return res.json(config.GENERICERROR);
			}
			res.json(room);
		});
	},
	deleteRoom: (req, res) => {
		Room.findById(req.params.id, (err, room) => {
			if (err) {
				return res.json(config.GENERICERROR);
			}
			if (!room) {
				return res.json({
					status: false,
					message: 'Room not found'
				});
			}
			if (room.admins.indexOf(req.decoded.id) != -1) {
				room.remove((err) => {
					if (err) {
						return res.json(config.GENERICERROR);
					}
					User.findById(req.decoded.id, (err, user) => {
						if (err) {
							return res.json(config.GENERICERROR);
						}
						let index = user.rooms.indexOf(room.id);
						user.rooms = user.rooms.splice(index, 1);
						user.save((err) => {
							if (err) {
								return res.json(config.GENERICERROR);
							}
							res.json({
								status: true,
								message: 'Room deleted succesfully'
							});
						});
					});
				});
			} else {
				res.status(403).json({
					status: false,
					message: 'Unauthorized to delete room'
				});
			}
		});
	},
	joinRoom: (req, res) => {
		Room.findOneAndUpdate({
			_id: req.params.id
		}, {
			$addToSet: {
				members: req.decoded.id
			}
		}, (err, room) => {
			if (err) {
				return res.json(config.GENERICERROR);
			}
			if (!room) {
				return res.json({
					status: false,
					message: 'Room not found'
				});
			}
			User.findOneAndUpdate({
				_id: req.decoded.id
			}, {
				$addToSet: {
					rooms: room.id
				}
			}, (err, user) => {
				if (err) {
					return res.json(config.GENERICERROR);
				}
				res.json({
					status: true,
					message: 'You were added correctly'
				});
			});
		});
	},
	leaveRoom: (req, res) => {
		Room.findOneAndUpdate({
			_id: req.params.id
		}, {
			$pull: {
				members: req.decoded.id,
				admins: req.decoded.id
			}
		}, (err, room) => {
			if (err) {
				return res.json(config.GENERICERROR);
			}
			User.update({
				_id: req.decoded.id
			}, {
				$pull: {
					rooms: room.id
				}
			}, (err) => {
				if (err) {
					return res.json(config.GENERICERROR);
				}
				res.json({
					status: true,
					message: 'Removed correctly'
				});
			});
		});
	},
	getRoomsByUser: (req, res) => {
		User.findById(req.params.id).populate({
			path: 'rooms',
			select: 'name description bannerPicture'
		}).exec((err, rooms) => {
			if (err) {
				return res.json(config.GENERICERROR);
			}
			res.json({
				status: true,
				rooms: rooms.rooms
			});
		});
	}
};

module.exports = roomCtrl;
