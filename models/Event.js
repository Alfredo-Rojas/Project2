const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventsSchema = new Schema ({
  name: {type: String},
  location: {
    streetAddress : {type: String },
    city: {type: String},
    state: {type: String},
    country: {type: String}
  },
  participants: [{type: Schema.Types.ObjectId , ref: 'User'}],
  type: {type: String},
  description: {type: String},
  image: {type: String},
  checkin: [{type: Schema.Types.ObjectId , ref: 'User'}],
  leftEvents: [{type: Schema.Types.ObjectId , ref: 'User'}],
  comments: [{
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    comments : {type: String},
    timestamp: {type: Date}
  }],
  time: {type: Date} 
});

module.exports = mongoose.model('Events', EventsSchema);