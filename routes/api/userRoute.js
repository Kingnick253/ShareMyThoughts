const router = require("express").Router();
const {getUser,getOneUser, createUser, updateUser, deleteUser, addFriend, removeFriend } = require("../../controllers/userController");
// get and post route
router.route("/")
.get(getUser).post(createUser);
// find get update and delete user route
router.route("/:userId")
  .get(getOneUser)
  .put(updateUser)
  .delete(deleteUser);
// post and delete route friends
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;