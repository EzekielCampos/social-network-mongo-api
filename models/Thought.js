const { Schema, model } = mongoose;

const {reactionSchema} = require('./Reaction')

const {formatDate} = require('../helpers/dateFormat')

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
  },
  createdAt:{
    type:Date,
    default:Date.now(),
    get:formatDate
  },
  username:{
    type:String,
    required:true
  },
  reactions:[reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(()=>{
  return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
