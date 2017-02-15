const Chat = require('../models/chat.model');
const User = require('../models/user.model');
const config = require('../config');

module.exports = {
	getAllChatsFromRooms: (req, res) => {
		let page;
		if (!req.query.page || req.query.page < 2) {
			page = 1;
		} else {
			page = req.query.page;
		}
		let options = {
			select: 'text user createdAt',
			page: page,
			limit: config.CHATSPAGINATION,
			sort: {
				createdAt: 1
			}
		};
		User.findById(req.decoded.id, (err, user) => {
			if (err) {
				return res.json(config.GENERICERROR);
			}
			if (user.rooms.indexOf(req.params.id) != -1) {
				Chat.paginate({
					room: req.params.id
				}, options).then((chats) => {
					return res.json({
						status: true,
						chats: chats.docs
					});
				});
			} else {
				return res.status(403).json({
					status: false,
					message: 'User do not belong to the room'
				});
			}
		});
	},
	sendChat: (req, res) => {
		//Check if User belongs to room
		User.findById(req.decoded.id, (err, user) => {
			if (err) {
				return res.json(config.GENERICERROR);
			}
			if (user.rooms.indexOf(req.params.id) != -1) {
				//User belongs to room
				let chat = new Chat();
				chat.text = req.body.text;
				chat.user = req.decoded.id;
				chat.room = req.params.id;
				chat.save((err) => {
					if (err) {
						return res.json(config.GENERICERROR);
					}
					return res.json({
						status: true,
						message: 'Chat succesfully added'
					});
				});
			} else {
				return res.status(403).json({
					status: false,
					message: 'User do not belong to the room'
				});
			}
		});
	},
	searchChats: (req, res) => {
		Chat.find({
			$text: {
				$search: req.query.query,
				$language: 'english'
			}
		}).sort({
				createdAt: -1
		}).select('text user createdAt').exec((err, chats) => {
			if (err) {
				return res.json(config.GENERICERROR);
			}
			return res.json({
				status: true,
				chats: chats
			});
		});
	}
};
