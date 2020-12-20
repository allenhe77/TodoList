const mongoose = require('mongoose');

const {Schema} = mongoose;

const taskSchema = new Schema({
    title: {
        type:String,
        required:true,
        maxlength:50
    },

    createdDate:{
        type: Date,
        required:true,
        default: Date.now
    },

    completed: {
        type:Boolean,
        required:true
    },

    owner:{
        required: true,
        type: new mongoose.Schema({
            name: {
                type:String,
                required:true,
                minlength:4,
                maxlength:50
            }
        }),
    },
});

const Task = mongoose.model("Task",taskSchema)

exports.Task = Task;
exports.taskSchema = taskSchema;