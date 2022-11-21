//requires boths models user and thought
const { user, thought } = require("../models");

module.exports = {
    getUser(req, res){
        user.find()
        .then((user) => res.json(user))
        .catch((err) => res.staus(500).json(err));
    },

    getOneUser(req, res){
        user.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate({path: "thoughts", select: "-__v"})
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
    },

    createUser(req, res){
        user.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).JSON(err);
            });
    },

    updateUser(req, res){
        user.findOneAndUpdate(
                {_id: req.params.userId },
                {$set: req.body },
                {runValidators: true, new: true}
            )
            .then((user) =>
            !user
                ? res.status(404).json({message: "No user found with this id!"})
                : res.json(user)
                )
                .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        user
          .findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No user found with this ID" })
              : thought.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: "User deleted!" }))
          .catch((err) => res.status(500).json(err));
      },

      addFriend(req, res) {
        user.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.body.friendId } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with this ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      removeFriend(req, res) {
        user.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: { friends: req.params.friendId } } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with this ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

};