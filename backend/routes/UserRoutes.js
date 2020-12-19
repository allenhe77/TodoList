const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
router.get('/', userController.user_get_all);

router.post('/', userController.user_create_user);

router.put('/', async (req, res) => {

});

router.delete('/', async (req, res) => {

});

module.exports = router;