const mongoose = require('mongoose');
const { Schema } = mongoose;
const { formatDate } = require('../helpers/dateFormat');
// This schema will act as a subdocument that will be used in Thoughts
const reactionSchema = new Schema(
  {
    // Custom id name that will represent the specifc reaction
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: formatDate,
    },
    // This will represent the name of the user who did the reaction
    username: {
      type: String,
      required: true,
    },
    reactionBody:{
      type: String,
      required: true,
      maxlength: 280,
    }
  },
  {
    // Disable the default _id field
    _id: false,
    toJSON: { getters: true }, // Enable getters when converting documents to JSON
    toObject: { getters: true }, // Enable getters when converting documents to plain objects
  }
);

module.exports = { reactionSchema };
