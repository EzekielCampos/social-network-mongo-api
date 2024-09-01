const mongoose = require('mongoose');
const { Schema } = mongoose;
const {formatDate} = require('../helpers/dateFormat')

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get:formatDate
  },
  username: {
    type: String,
    required: true,
  },
});


module.exports = {reactionSchema}
