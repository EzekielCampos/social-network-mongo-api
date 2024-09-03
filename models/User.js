const { Schema, model } = require('mongoose');
const validator = require('validator');

// This schema will layout the information needed to create a new User
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
    // This will reference the Thought model which will join the two models
    // and respond with all the data that corresponds from the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // This model will hold other users that are friends and will respond with all the 
    // data that is specific for each friend through the reference
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  // This will display the virtual values in the return object 
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// This virtual will return the number of friends that exist in the friends array for specific user
userSchema.virtual('friendCount').get(function (){
  if(!this.friends){
    return 0;
  }
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
