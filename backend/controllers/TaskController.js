const _ = require('lodash');
const { Task } = require('../models/Task');
const { User } = require('../models/User');

exports.getAllUserTasks = async (req, res, next) => {
    await Task
            .find({author: req.params.id })
            .exec((err, tasks) => {
                if(err) return next(err);
                res.status(200).json(tasks);
            });
};

exports.createTaskForUser = async (req, res, next) => {
    // TODO: verify user exists could be a middleware
    let user;
    try {
        user = await User.findById(req.params.id);
        if(user === undefined) {
            throw new Error("Cannot find user");
        }
    } catch (err) {
        return next(err);
    }
    
    let task = new Task({
        title: req.body.title,
        content: req.body.content,
        author: req.params.id
    });
    
    task.save()
            .then(savedTask => res.status(200).json(savedTask))
            .catch((err) => next(err));
};

exports.deleteTaskFromUser = async (req, res, next) => {
    console.log(req.params.taskId.toString());

    await Task
            .findByIdAndRemove(req.params.taskId)
            .lean()
            .exec((err, task) => {
                if(err) return next(err);
                return res.status(200).json({status:200, task:task});
            });
}

exports.updateTaskFromUser = async (req, res, next) => {
    let task;
    try{
        task = await Task.findByIdAndUpdate(
            req.params.taskId,
            {$set: req.body},
            {new:true}
        );
        if(task === undefined) throw new Error("Cannot find task"); 
        return res.status(200).json({status:200, task:task});
    } catch(err){
        return next(err);
    }
}