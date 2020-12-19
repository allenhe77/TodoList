const { User } = require('../models/User');
const _ = require('lodash');

exports.user_get_all = async (req, res) => {
    let user = await User.find({}).sort('name');
    res.send(user);
};

exports.user_create_user = async (req, res ) => {
    let newUser = new User(_.pick(req.body, ['name']));
    
    await newUser.save();

    res.status(200).json(newUser);
};