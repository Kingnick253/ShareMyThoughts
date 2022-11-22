const router = require("express").Router();
const {getThought,getOneThought, createThought, updateThought, deleteThought, addReaction, removeReaction} = require("../../controllers/thoughtController");

router.route('/')
    .get(getThought)
    .post(createThought);

router.route('/:id')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:id/reactions')
    .post(addReaction);

router.route('/:id/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;