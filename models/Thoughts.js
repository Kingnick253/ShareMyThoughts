const { Schema, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {

        
        reactionBody: {
            type: String,
            required: true,
            max: 280,
        }, 

        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
          },
          username: {
            type: String,
            require: true,
          },
          
          createdAt: {
            type: Date,
            default: Date.now,
            get: newDate => moment(newDate).format("MM DD, YYYY"),
          },
    },

);

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