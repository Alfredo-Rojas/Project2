const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema ({
  username: {type: String, unique: true},
  password: {type: String},
  eventCreated: [{type: Schema.Types.ObjectId , ref: 'Events'}],
  eventGoing: [{type: Schema.Types.ObjectId , ref: 'Events'}],
  id: {type: String}
});



module.exports = mongoose.model('User', UserSchema);