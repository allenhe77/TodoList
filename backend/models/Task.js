const mongoose = require('mongoose');

const {Schema} = mongoose;

const taskSchema = new Schema({
    taskBody: {
        type:String,
        required:true,
    },

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
        required: [true, 'Missing Owner Name...'],
        type: new mongoose.Schema({
            user_ref:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users'
            },
            name: String,
        }),
    },
});

const Task = mongoose.model("Task",taskSchema)

exports.Task = Task;
exports.taskSchema = taskSchema;