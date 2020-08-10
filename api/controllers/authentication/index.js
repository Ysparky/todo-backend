'use strict';

const express = require('express');
const authenticationController = require('./authentication.controller');

const router = express.Router();

router.post('/', authenticationController.login);

module.exports = router;