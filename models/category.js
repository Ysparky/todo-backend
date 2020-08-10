'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupCategoryModel(config) {
    const sequelize = setupDatabase(config);
    const category = sequelize.define('category', {
        name: {
            type: Sequelize.STRING(25),
            allowNull: false,
            unique: true
        }
    });
    return category;
};