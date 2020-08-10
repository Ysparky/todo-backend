'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupUserModel(config) {
    const sequelize = setupDatabase(config);
    const user = sequelize.define('user', {
        username: {
            type: Sequelize.STRING(25),
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING(25),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return user;
};