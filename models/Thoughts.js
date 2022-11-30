const { Schema, model} = require('mongoose');
const reactionSchema = require('./Reactions');
const moment = require('moment');



const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280,
        minLength: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: newDate => moment(newDate).format("MM DD, YYYY"),
      },
      username: {
        type: String,
        require: true,
      },
      reaction: [reactionSchema]
    }


);

    thoughtSchema.virtual("reactionCount").get(function(){
        return this.reactions.length;
    });

    const Thought = model("Thought", thoughtSchema);

    module.exports = Thought;