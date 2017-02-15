//REQUIRE
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const validator = require('node-mongoose-validator');
const mongoosePaginate = require('mongoose-paginate');
//SCHEMA
var userSchema = new Schema({
  username: {type: String, required: true, index: {unique: true}},
  email: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true, select: false},
  createdAt: {type: Date, required: true, default: Date.now},
  rooms: [{type: Schema.Types.ObjectId, ref: 'Rooms'}],
  profilePictue: {type: String, required:true, default: '/default.jpg'}
});
//HASHING password
userSchema.pre('save', function(next){
  let user = this;
  //HASHING PASSWORD ONLY IF PASSWORD CHANGES
  if(!user.isModified('password')){
    return next();
  }
  //Generate the hash
  bcrypt.hash(user.password, null, null, (err, hash) => {
    if(err){
      return next(err);
    }
    //HASH PASSWORD
    user.password = hash;
    next();
  });
});
//COMPARE PASSWORDS
userSchema.methods.comparePassword = function(password){
  let user = this;
  return bcrypt.compareSync(password, user.password);
};
//VALIDATIONS TO MODEL
userSchema.path('email').validate(validator.isEmail(), 'Please provide a valid email address');
//PAGINATION PLUGIN
userSchema.plugin(mongoosePaginate);
//EXPORT
module.exports = mongoose.model('Users', userSchema);
