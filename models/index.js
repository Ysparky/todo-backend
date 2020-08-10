'use strict';

const setupDatabase = require('./database');

const setupCategoryModel = require('./category');
const setupTaskModel = require('./task');
const setupUserModel = require('./user');

module.exports = async function (setup = false) {

    const config = require('./../environment/development.json');
    const dbInstance = setupDatabase(config);

    const categoryModel = setupCategoryModel(config);
    const userModel = setupUserModel(config);
    const taskModel = setupTaskModel(config);

    await dbInstance.authenticate();

    if (setup) {
        await dbInstance.sync({ force: true });
    }

    return {
        categoryModel,
        userModel,
        taskModel
    };
};