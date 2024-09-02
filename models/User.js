const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema(
  {
    username: {
      required: true,
      type: String,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase:true,
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function (){
  if(!this.friends){
    return 0;
  }
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
