const router = require('express').Router();

// These functions come from the controllers folder and hanlde all the CRUD operations for the 
// corresponding api routes
const {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController')

// This route will find all users and create one new user
router.route('/').get(getUsers).post(createUser);

// Using the specfied ID this route will read, update, or delete one user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// This route adds friends to the user friends array by using their ID
router.route('/friends/:userId/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;
