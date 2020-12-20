const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');

router.get('/:id', taskController.tasks_get_all_from_user);
router.post('/:id', taskController.tasks_create_for_user)

module.exports = router;