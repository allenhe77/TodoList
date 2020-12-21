const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');

router.get('/:id', taskController.getAllUserTasks);
router.post('/:id', taskController.createTaskForUser)
router.delete('/:id/:taskId', taskController.deleteTaskFromUser);
router.put('/:userId/:taskId', taskController.updateTaskFromUser);

module.exports = router;