const User = require('../models/user.model');
const config = require('../config');
const jwt = require('jsonwebtoken');
const secret = config.SECRET;

var userCtrl = {
	getUsers: (req, res) => {
		let page;
		if(!req.query.page || req.query.page < 2){
			page = 1;
		}else{
			page = req.query.page;
		}
		let options = {
			select: '_id email username profilePictue',
			page: page,
			limit: config.USERPAGINATION
		};
		User.paginate({}, options).then((result) => {
			res.json({status: true, page: result.page, users: result.docs});
		});
	},
  createUser: (req, res) => {
    let user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err) => {
      if(err){
        if(err.code == 11000){
          return res.json({status: false, message: 'Username/email already taken'});
        }else{
          return res.status(400).json(config.GENERICERROR);
        }
      }
      res.json({status: true, message: 'User succesfuly created'});
    });
  },
  getSpecificUser: (req, res) => {
    let id = req.params.id;
    User.findById(id, (err, user) => {
      if(err){
        return res.json(config.GENERICERROR);
      }
      res.json({status: true, user});
    });
  },
  login: (req, res) => {
    let query;
    if(req.body.username){
      query = {username: req.body.username};
    }else if(req.body.email){
      query = {email: req.body.email};
    }
    User.findOne(query)
    .select('username email password')
    .exec((err, user) => {
      if(err){
        throw err;
      }
      if(!user){
        res.json({ status: false, message: 'Invalid username/email or password'});
      } else if (user){
        let validPassword = user.comparePassword(req.body.password);
        if(!validPassword){
          res.json({status: false, message: 'Invalid username/email or password'});
        }else{
          let token = jwt.sign({
            id: user._id,
            username: user.username
          }, secret, {
            expiresIn: 60 * 60 * 24
          });
          res.json({status: true, message: 'Login succesfuly', token: token});
        }
      }
    });
  },
  me: (req, res) => {
    res.json(req.decoded);
  }
};

module.exports = userCtrl;
