const mongoose = require('mongoose');
const { Schema } = mongoose;
const { formatDate } = require('../helpers/dateFormat');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    // Disable the default _id field
    _id: false,
    toJSON: { getters: true }, // Enable getters when converting documents to JSON
    toObject: { getters: true }, // Enable getters when converting documents to plain objects
  } 
);

module.exports = { reactionSchema };
