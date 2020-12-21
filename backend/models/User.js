const mongoose = require('mongoose');
const {Task, taskSchema} = require('./Task');

const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:4,
        maxlength:50
    },
});

const User = mongoose.model("User",userSchema)

exports.User = User;
exports.userSchema = userSchema;