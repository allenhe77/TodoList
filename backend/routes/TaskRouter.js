const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');

router.get('/:id', taskController.getAllUserTasks);
router.post('/:id', taskController.createTaskForUser)
router.delete('/:id', taskController.deleteTaskFromUser);

module.exports = router;