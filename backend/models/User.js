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

    tasks:[{
        taskBody: String,
        completed:{
            type: Boolean,
            default:false,
        },
        
        task_ref: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tasks'
        }
    }]
});

const User = mongoose.model("User",userSchema)

exports.User = User;
exports.userSchema = userSchema;