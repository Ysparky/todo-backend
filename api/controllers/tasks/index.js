'use strict';

const express = require('express');
const taskController = require('./task.controller');

const router = express.Router();

router.get('/:userId/category/:categoryId', taskController.get);
router.get('/:userId', taskController.getTaskStatistics);
router.post('/:userId', taskController.post);
router.put('/:userId', taskController.put);
router.delete('/:taskId/user/:userId', taskController.deleteTask);

module.exports = router;