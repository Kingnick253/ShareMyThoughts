const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
        username:{
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        
    }
)