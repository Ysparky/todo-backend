'use strict';

const setupDatabase = require('./../models');

const setupAuthenticationModel = require('./authentication.service');
const setupTaskModel = require('./task.service');
const setupUserModel = require('./user.service');

module.exports = async function () {
    const dbInstance = await setupDatabase();

    const authenticationService = setupAuthenticationModel(dbInstance.userModel);
    const userService = setupUserModel(dbInstance.userModel);
    const taskService = setupTaskModel(dbInstance.taskModel);

    return {
        authenticationService,
        taskService,
        userService
    };
};