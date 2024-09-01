const router = require('express').Router();

router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route(':userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;
