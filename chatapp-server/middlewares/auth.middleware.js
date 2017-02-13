const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.SECRET;

var authMiddleware = {
  checkToken: (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
      jwt.verify(token, secret, (err, decoded) => {
        if(err){
          res.status(403).json({
            status : false,
            message: 'Failed to authenticate token'
          });
        }else{
          req.decoded = decoded;
          next();
        }
      });
    }else{
      res.status(403).json({
        status: false,
        message: 'No Token Provided'
      });
    }
  }
};

module.exports = authMiddleware;
