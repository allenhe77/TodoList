const _ = require('lodash');
const { Task } = require('../models/Task');
const { User } = require('../models/User');

exports.getAllUserTasks = async (req, res, next) => {
    await User
            .findById({_id: req.params.id })
            .select('name tasks')
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
        author: {
            user_ref: user._id,
            name: user.name
        }
    });

    console.log(task._id);

    // TO-DO: Implement transaction
    user.tasks.push({
        title: task.title,
        task_ref: task._id
    });

    user = await user.save();
    
    task.save()
            .then(savedTask => res.status(200).json(savedTask))
            .catch((err) => next(err));
};

exports.deleteTaskFromUser = async (req, res, next) => {

    await User.findByIdAndUpdate(
        req.params.id,
        {$pull: {'tasks': {task_ref:req.body.task_ref}}})
        .exec((err, user) => {
            if(err) return next(err);
        });

    await Task
            .findByIdAndRemove(req.body.task_ref)
            .lean()
            .exec((err, task) => {
                if(err) return next(err);
                return res.status(200).json({status:200, task:task});
            });
}

exports.updateTaskFromUser = async (req, res, next) => {
    // assume that task exists both in user and task collections
    let task;
    try{
        task = await Task.findByIdAndUpdate(
            req.params.taskId,
            {$set: req.body},
            {new:true}
        );
        if(task === undefined) throw new Error("Cannot find task"); 
    } catch(err){
        return next(err);
    }

    
    await User
            .findByIdAndUpdate(
                {'_id':req.params.userId,'task_ref':req.params.taskId},
                {$set: {"tasks": {
                    title: task.title,
                    completed: task.completed
                }}},
                {new:true}
            ).exec((err,user) => {
                if(err) return next(err);
                return res.status(200).json({status:200, user:user});
            });
}