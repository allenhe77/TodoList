const mongoose = require('mongoose');
const Task = require('./Task');

const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:4,
        maxlength:50
    },

    tasks:[{
        type:Schema.Types.ObjectId,
        ref:'Task',
        required:false
    }]
})

const User = mongoose.model("User",userSchema)

exports.User = User;