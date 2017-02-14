//REQUIRE
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
//SCHEMA
var chatSchema = new Schema({
  text: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'Users'},
  createdAt: {type: Date, required: true, default: Date.now},
  room: {type: Schema.Types.ObjectId, ref: 'Rooms'}
});
//TEXT INDEX
chatSchema.index({text: 'text'});
//MONGOOSE PAGINATION
chatSchema.plugin(mongoosePaginate);
//EXPORT
module.exports = mongoose.model('Chats', chatSchema);
