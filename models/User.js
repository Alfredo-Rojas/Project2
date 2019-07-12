const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema ({
  username: {type: String},
  password: {type: String},
  eventCreated: [{type: Schema.Types.ObjectId , ref: 'Event'}],
  eventGoing: [{type: Schema.Types.ObjectId , ref: 'Event'}]
});

module.exports = mongoose.model('User', UserSchema);