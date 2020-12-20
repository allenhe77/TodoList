const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/', userController.user_get_all);

router.post('/', userController.user_create_user);

router.put('/:id', userController.user_edit_user_name);

router.delete('/:id', userController.user_delete_user)

module.exports = router;