const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username:{
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email:{
          type: String,
          required: true,
          unique: true,  
        //   ** regex email validator **
        },
        thoughts:[{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends:[{
            type: Schema.Types.ObjectId,
            ref: "User"
        }]
    },
    {
        toJSON:{
            virtuals: true,
            getters: true
        },
        
        id: false,

    }
);

    usersSchema.virtual('friendCount').get(function(){
        return this.friends.length;
    })

    const User = model('user', userSchema);

    module.exports = User;