import mongoose from "mongoose";
import User from "./User"

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
        ref:User,
        required:true
    }


})

const Task = mongoose.model("Task",taskSchema)