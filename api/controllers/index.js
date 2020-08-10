'use strict';

const express = require('express');
const router = express.Router();

router.use('/authentication', require('./authentication'));
router.use('/tasks', require('./tasks'));
router.use('/users', require('./users'));

module.exports = router;