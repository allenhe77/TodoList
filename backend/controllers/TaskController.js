const _ = require('lodash');
const { Task } = require('../models/Task');
const { User } = require('../models/User');

exports.tasks_get_all_from_user = async (req, res, next) => {
    await User
            .findById({_id: req.params.id })
            .select('tasks')
            .lean()
            .exec((err, tasks) => {
                if(err) return next(err);
                res.status(200).json(tasks);
            });
};

exports.tasks_create_for_user = async(req, res, next) => {
    let user;
    try {
        user = await (await User.findById(req.params.id)).execPopulate();
        if(user == null) {
            throw new Error("Cannot find user");
        }
    } catch (err) {
        next(err);
    }

    console.log(user);
    
    let task = new Task({
        title: req.body.title,
        owner: {
            _id: user._id,
            name: user.name
        }
    });

    user.tasks.push({task});
    user = await user.save();
    console.log(user);
    

    task.save()
            .then(savedTask => res.status(200).json(savedTask))
            .catch((err) => next(err));
};