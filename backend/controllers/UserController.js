const { User } = require('../models/User');
const _ = require('lodash');

exports.user_get_all = async (req, res, next) => {
    await User
            .find({})
            .sort('name')
            .lean()
            .exec((err, user) => {
                if(err) return next(err);
                res.status(200).json(user)
            });
};

exports.user_create_user = async (req, res, next ) => {
    let newUser = new User(_.pick(req.body, ['name']));
    await newUser.save()
                .then(savedUser => res.status(200).json(savedUser))
                .catch((err) => next(err));
};

exports.user_edit_user_name = async (req, res, next) => {
    await User
            .findByIdAndUpdate(req.params.id, {name: req.body.name}, {new:true})
            .lean()
            .exec((err, user) => {
                if(err) return next(err);
                return res.status(200).json({status:200, user:user})
            });
};

exports.user_delete_user = async(req, res, next) => {
    await User
            .findByIdAndRemove(req.params.id)
            .lean()
            .exec((err, user) => {
                if(err) return next(err);
                return res.status(200).json({status:200, user:user});
            });
}

