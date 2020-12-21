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
    let user;
    try {
        user = await User.findById(req.params.id);
        if(user == null) {
            throw new Error("Cannot find user");
        }
    } catch (err) {
        return next(err);
    }

    console.log(user.name);
    console.log(user._id);
    
    let task = new Task({
        taskBody: req.body.taskBody,
        author: {
            user_ref: user._id,
            name: user.name
        }
    });

    console.log(task);

    
    user.tasks.push({
        taskBody: task.taskBody,
        task_ref: task._id
    });
    user = await user.save();
    console.log(user);
    

    task.save()
            .then(savedTask => res.status(200).json(savedTask))
            .catch((err) => next(err));
};

exports.deleteTaskFromUser = async (req, res, next) => {

    await User.findByIdAndUpdate(
        req.params.id,
        {$pull: {"tasks": {task_ref:req.body.task_ref}}
    }).exec((err, user) => {
        if(err) return next(err);
    })

    // let user;
    // try {
    //     user = await User.findById(req.params.id);
    //     if(user == null) {
    //         throw new Error("Cannot find user");
    //     }
    // } catch (err) {
    //     return next(err);
    // }

    // // verify task exists for user
    // if(!user.tasks.find(task => task.task_ref === req.body.task_ref) === undefined){
    //     return next(new Error('Requested task does not exist for user!'));
    // } else {
        
    // }

    await Task
            .findByIdAndRemove(req.body.task_ref)
            .lean()
            .exec((err, task) => {
                if(err) return next(err);
                return res.status(200).json({status:200, task:task});
            });
}