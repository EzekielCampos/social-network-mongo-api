const router = require('express').Router();

const {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController')

router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// router.route(':userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;
