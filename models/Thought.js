const { Schema, model } = require('mongoose');

const { reactionSchema } = require('./Reaction');

const { formatDate } = require('../helpers/dateFormat');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
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
  reactions: [reactionSchema],
});

thoughtSchema.virtual('reactionCount').get(
  function () {
    return this.reactions.length;
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
