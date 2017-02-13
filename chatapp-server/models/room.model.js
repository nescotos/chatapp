//REQUIRE
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//SCHEMA
var roomSchema = new Schema({
  name: {type: String, required: true, index: {unique: true}},
  description: {type: String},
  admins: [{type: Schema.Types.ObjectId, ref: 'Users'}],
  createdAt: {type: Date, required: true, default: Date.now},
  members: [{type: Schema.Types.ObjectId, ref: 'Users'}],
  bannerPicture: {type: String, required: true, default: '/default.jpg'}
});
//TEXT INDEX
roomSchema.index({name: 'text'});
//EXPORT
module.exports = mongoose.model('Rooms', roomSchema);
