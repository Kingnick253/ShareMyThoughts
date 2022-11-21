const { thought, user } = require("../models");


module.exports ={
    getThought(req, res){
        thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getOneThought(req, res) {
        thought
          .findOne({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought found with this ID" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    
      createThought(req, res) {
        thought
          .create(req.body)
          .then((thought) => res.json(thought))
          .catch((err) => res.status(500).json(err));
      },
      
      updateThought(req, res) {
        thought
          .findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought found with this ID" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      deleteThought(req, res) {
        thought
          .findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought found with this ID" })
              : user.findOneAndUpdate(
                  { thoughts: req.params.thoughtId },
                  { $pull: { thoughts: { _Id: req.params.thoughtId } } },
                  { runValidators: true, new: true }
                )
          )
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No user found with this ID :(" })
              : res.json({ message: "thought and user deleted!" })
          )
          .catch((err) => res.status(500).json(err));
      },
    
      addReaction(req, res) {
        thought
          .findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: "No thought found with this ID :(" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    
      removeReaction(req, res) {
        thought
          .findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
          )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: "No thought found with this ID :(" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    };