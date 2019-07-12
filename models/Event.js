const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema ({
  name: String,
  location: {
    streetAddress,
    city,
    state,
    country
  },
  participants: [],
  type: String,
  description: String,
  image: URL,
  checkin: [],
  leftEvent: [],
  comments: [{
    owner,
    comments
  }],
  time: Date 
});

module.exports = mongoose.model('Event', EventSchema);