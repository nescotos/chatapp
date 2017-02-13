//REQUIRE
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//SCHEMA
var chatSchema = new Schema({
  text: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'Users'},
  createdAt: {type: Date, required: true, default: Date.now},
  room: {type: Schema.Types.ObjectId, ref: 'Rooms'}
});
//TEXT INDEX
chatSchema.index({text: 'text'});
//EXPORT
module.exports = mongoose.model('Chats', chatSchema);
