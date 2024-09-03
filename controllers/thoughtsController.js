const { User, Thought } = require('../models');

module.exports = {
  // This will return all thoughts that were created
  async getThoughts(req, res) {
    try {
      const allThoughts = await Thought.find({}).select('-__v');
      //   If there was a problem finding the thoughts then returns an error
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
      // Takes the information from req.body and creates a new thought
      const userThought = await Thought.create(req.body);
      if (!userThought) {
        return res.status(404).json({ message: 'Error in creating thought' });
      }

      // Once the thought is created it is then updated
      // into the thoughts array of the user that created it
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: userThought._id } }
      );
      //   If that user does not exist then it will return an error
      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that username',
        });
      }
      res.status(200).json(userThought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getSingleThought(req, res) {
    try {
      // Uses the ID to find one thought that corresponds to the ID
      const thought = await Thought.findById(req.params.thoughtId).select('-__v');
      //   If not such thought exist then an error is returned
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
      // This will update the text of the thought using it's ID to find the correct one
      const updated = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { thoughtText: req.body.thoughtText },
        // Return the new result of the update
        { new: true }
      );
      //   If there was a problem with the update then error message returns
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
      // Deletes the thought using it's ID
      const deleted = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!deleted) {
        return res.status(404).json({
          message: 'No thought found with that associated ID',
        });
      }
      //   Updates the user's thoughts by removing it from there array
      const user = await User.findOneAndUpdate(
        { username: deleted.username },
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

  async createReaction(req, res) {
    try {
      // Find the specific thought using it's ID
      const thoughtReaction = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        // Create a new reaction by adding it to the reactions array
        {
          $addToSet: { reactions: req.body },
        },
        // Return the new result of the update
        { new: true }
      );

      if (!thoughtReaction) {
        return res.status(400).json({ message: 'No thought found at that ID' });
      }
      res.status(200).json(thoughtReaction);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteReaction(req, res) {
    try {
      // Find the specific thought using it's ID
      const deleted = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        // Find the specific reaction using it's ID and remove it from this thoughts reactions array
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        // Returns the updated result
        { new: true }
      );

      //   If there was a probelm with the deletion then returns an error
      if (!deleted) {
        return res.status(404).json({ message: 'No thought found at that ID' });
      }
      res.status(200).json(deleted);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
