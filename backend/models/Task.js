const mongoose = require('mongoose');
const User = require('./User');

const {Schema} = mongoose;

const taskSchema = new Schema({
    title: {
        type:String,
        required:true,
        maxlength:50
    },

    createdDate:Date,
    completed: {
        type:Boolean,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }


})

const Task = mongoose.model("Task",taskSchema)

exports.Task = Task;