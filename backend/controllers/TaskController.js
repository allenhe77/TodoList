const _ = require('lodash');
const { Task } = require('../models/Task');
const { User } = require('../models/User');

exports.tasks_get_all_from_user = async (req, res, next) => {
    await Task
            .find({_id: req.params.id })
            .sort('title')
            .lean()
            .exec((err, tasks) => {
                if(err) return next(err);
                res.status(200).json(task);
            });
};

exports.tasks_create_for_user = async(req, res, next) => {
    let user = await User
                    .findbyId(req.body.ownerId)
                    .lean()
                    .exec((err) => {
                        if(err) return next(err);
                    });
    
    let task = new Task({
        title: req.body.title,
        owner: {
            _id: user._id,
            name: user.name
        }
    });

    await task.save()
            .lean()
            .then(savedTask => res.status(200).json(savedTask))
            .catch((err) => next(err));
};