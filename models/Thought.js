const { Schema, model } = require('mongoose');
// This schema will be used as a subdocument 
const { reactionSchema } = require('./Reaction');
// Function will format date accordingly
const { formatDate } = require('../helpers/dateFormat');

// This schema will be the layout for all the information that will be necessary 
// for creating a thought
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // This will format the date to month/date/year
      get: formatDate,
    },
    // References the user by username
    username: {
      type: String,
      required: true,
    },
    // Reactions come from other users and uses the reaction schema as a subdocument
    reactions: [reactionSchema],
  },
  {
    toJSON: { getters: true }, // Enable getters when converting documents to JSON
    toObject: { getters: true }, // Enable getters when converting documents to plain objects
  }
);

// This virtual will return the count of reactions that each thought has
thoughtSchema.virtual('reactionCount').get(
  function () {
    if(!this.reactions){
      return 0
    }
    return this.reactions.length;
  },
  // This will allow the virtual to be returned in the object 
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
