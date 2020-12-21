const mongoose = require('mongoose');

const {Schema} = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        default: 'Untitled'
    },

    content: String,

    createdDate:{
        type: Date,
        required:true,
        default: Date.now
    },

    completed: {
        type:Boolean,
        required:true,
        default: false
    },

    author:{
        required: [true, 'Author missing, please provide author of this task...'],
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Task = mongoose.model("Task",taskSchema)

exports.Task = Task;
exports.taskSchema = taskSchema;