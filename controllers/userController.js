const { User, Thought } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find({})
        .select('-__v')
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
      console.log(req.body);
      const userData = await User.create(req.body);
      res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  async getSingleUser(req, res) {
    try {
      const oneUser = await User.find({ _id: req.params.userId })
        .select('-__v')
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
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          thoughts: req.body.thoughts,
        },
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
      const deleted = await User.findByIdAndDelete(req.params.userId);
      if (!deleted) {
        return res.status(400).json({ message: 'User not found' });
      }
      const removeFriend = await User.updateMany({}, { $pull: { friends: req.params.userId } });
      const removeThoughts = await Thought.deleteMany({ username: deleted.username });
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
      const friend = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        {
          new: true,
        }
      );

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
