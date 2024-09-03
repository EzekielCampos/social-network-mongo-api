const router = require('express').Router();

// These functions come from the controller folder and performs all the db queries
// for the corresponding CRUD method
const {
    getThoughts,
    createThought,
    getSingleThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsController')

// This will get all thoughts and create one new one
router.route('/').get(getThoughts).post(createThought);

// This will take the wildcard and use it to read, update or delete a specific thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// This route will create a new reaction for a specific thought
router.route('/:thoughtId/reactions').post(createReaction);
//  Using the reaction ID it will delete the reaction from the corresponding
// thought 
router.route('/:thoughtId/:reactionId/reactions').delete(deleteReaction);

module.exports = router;
