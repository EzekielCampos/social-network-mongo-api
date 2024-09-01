const { Schema, model } = mongoose;

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  username:{
    type:String,
    required:true
  },
  reactions:[]
});

thoughtSchema.virtual('reactionCount').get(()=>{
  return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
