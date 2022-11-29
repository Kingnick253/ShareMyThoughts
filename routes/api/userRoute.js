const router = require("express").Router();
const {getUsers,getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } = require("../../controllers/userController");
// get and post route
router.route("/")
.get(getUsers)
.post(createUser);
// find get update and delete user route
router.route("/:userId")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);
// post and delete route friends
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;