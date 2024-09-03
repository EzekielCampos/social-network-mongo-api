const { User, Thought } = require('../models');

module.exports = {
  // This will find all users in the db
  async getUsers(req, res) {
    try {
      const users = await User.find({})
      // In the response it will remove this attribute from the user
        .select('-__v')
        // Populate essentially joins the User and Thought model and will
        // show all the specified attributes for the models
        .populate([
          { path: 'friends', select: 'username email -_id' },
          {
            path: 'thoughts',
            select: 'username thoughtText reactions',
          },
        ]);
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  async createUser(req, res) {
    try {
      // Takes the attributes from req.body and create new user
      const userData = await User.create(req.body);
      res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  async getSingleUser(req, res) {
    try {
      // Finds a user using it's ID
      const oneUser = await User.find({ _id: req.params.userId })
        .select('-__v')
        // Joins the models so that all their attributes are shown when the result is returned
        .populate([
          {
            path: 'friends',
            select: 'username email',
          },
          {
            path: 'thoughts',
            select: 'username thoughtText reactions',
          },
        ]);
      if (!oneUser) {
        return res.status(400).json({ message: 'No user with that ID' });
      }
      res.status(200).json(oneUser);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async updateUser(req, res) {
    try {
      // This will update the username
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          username: req.body.username,
        },
        // Since there an update need to set runValidators
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteUser(req, res) {
    try {
      // Finds the user by it's ID and deletes it 
      const deleted = await User.findByIdAndDelete(req.params.userId);
      if (!deleted) {
        return res.status(400).json({ message: 'User not found' });
      }
      // THis will go throughout the db and remove the currently deleted user in their friends array
      const removeFriend = await User.updateMany({}, { $pull: { friends: req.params.userId } });
      // This will take the username and delete all of their thoughts
      const removeThoughts = await Thought.deleteMany({ username: deleted.username });
      // This will remove all the reactions that were created by that user
      const deleteReactions = await Thought.updateMany(
        {},
        { $pull: { reactions: { username: deleted.username } } },
        { new: true }
      );
      res.status(200).json(deleted);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async addFriend(req, res) {
    try {
      // This will find a user by their ID and add the user with the wildcard value to the
      // friends array 
      const friend = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        {
          new: true,
        }
      );

      // If there was a problem finding the User then an error message will be sent back
      if (!friend) {
        return res.status(400).json({ message: 'User not found' });
      }

      res.status(200).json(friend);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteFriend(req, res) {
    try {
       // This will find a user by their ID and remove the user using the wildcard value to 
      //  find the user in the friend's array
      const removeFriend = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!removeFriend) {
        res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(removeFriend);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
