const { User, Thought } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const allThoughts = await Thought.find({});
      if (!allThoughts) {
        return res.status(404).json({ message: 'No thoughts found' });
      }
      res.status(200).json(allThoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async createThought(req, res) {
    try {
      const userThought = await Thought.create(req.body);
      if (!userThought) {
        return res.status(404).json({ message: 'Error in creating thought' });
      }

      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: userThought._id } }
      );
      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that username',
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought cannot be found with that ID' });
      }

      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async updateThought(req, res) {
    try {
      const updated = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { thoughtText: req.body },
        { new: true }
      );
      if (!updated) {
        return res.status(404).json({ message: 'Thought not found at that ID' });
      }
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteThought(req, res) {
    try {
      const deleted = await Thought.findByIdAndDelete(req.params.thoughtId);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $pull: { thoughts: deleted._id } }
      );
      if (!user) {
        return res.status(404).json({
          message: 'Thought deleted but found no user with that username',
        });
      }
      res.status(200).json(deleted);
    } catch (error) {
      res.stauts(500).json(error);
    }
  },
};
