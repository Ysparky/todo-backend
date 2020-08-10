'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('./database');

module.exports = function setupTaskModel(config) {
    const sequelize = setupDatabase(config);
    const task = sequelize.define('task', {
        description: {
            type: Sequelize.STRING(1234),
            allowNull: false,
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        categoryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id'
            }
        }
    });
    task.belongsTo(sequelize.models.category, { as: 'category' });
    task.belongsTo(sequelize.models.user, { as: 'user' });
    return task;
};