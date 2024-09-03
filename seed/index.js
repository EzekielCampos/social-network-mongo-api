const connection = require('../config/connection');

const { User, Thought } = require('../models');

connection.once('open', async () => {
  const eraseUsers = await User.deleteMany({});
  const eraseThoughts = await Thought.deleteMany({});
  const thoughts = { thoughtText: "I'm looking for the sunflower man", username: 'fu' };
  const allThoughts = await Thought.create(thoughts);


  const users = { username: 'fu', email: 'f@mail.com',thoughts:[allThoughts._id] };
  const allUsers = await User.create(users);


  console.log(allUsers, allThoughts);
  process.exit(0);
});
