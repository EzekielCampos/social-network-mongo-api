const { User, Thought } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async createUser(req, res) {
    try {
        console.log(req.body)
      const userData = await User.create(req.body);
      res.status(200).json(userData);
    } catch (error) {
        console.log(error)
      res.status(500).json(error);
    }
  },
  async getSingleUser(req, res) {
    try {
      const oneUser = await User.find({ _id: req.params.userId });
      if (!oneUser) {
        return res.status(400).json({ message: 'No user with that ID' });
      }
      res.status(200).json(oneUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          username: req.body.username,
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
      if(!deleted){
        return res.status(400).json({message:'User not found'})
      }
      res.status(200).json(deleted);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
