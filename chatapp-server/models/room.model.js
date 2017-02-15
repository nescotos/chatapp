//REQUIRE
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
//SCHEMA
var roomSchema = new Schema({
  name: {type: String, required: true, index: {unique: true}},
  description: {type: String},
  admins: [{type: Schema.Types.ObjectId, ref: 'Users'}],
  createdAt: {type: Date, required: true, default: Date.now},
  members: [{type: Schema.Types.ObjectId, ref: 'Users'}],
  bannerPicture: {type: String, required: true, default: '/default.jpg'},
  blacklist: [{type: Schema.Types.ObjectId, ref: 'Users'}]
});
//TEXT INDEX
roomSchema.index({name: 'text'});
//MONGOOSE PAGINATION
roomSchema.plugin(mongoosePaginate);
//EXPORT
module.exports = mongoose.model('Rooms', roomSchema);
