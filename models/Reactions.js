const {Schema, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({

        
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
          {
          toJSON: {
            virtuals: true,
          },
          id: false,
          _id: false,
        }
    

);
module.exports = reactionSchema;


