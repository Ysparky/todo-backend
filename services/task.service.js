'use strict';

const setupBaseService = require('./base.service');

const Sequelize = require('sequelize');
const constants = require('./constants');
const Op = Sequelize.Op;

module.exports = function setupTaskService(taskModel) {
    let baseService = new setupBaseService();

    async function create(task) {
        return await taskModel.create(task);
    }

    async function findById(taskId) {
        return await taskModel.findByPk(taskId);
    }

    async function createTask(task) {
        //validate categories, users
        const createdTask = await create(task);
        return baseService.getServiceResponse(200, 'Success', {
            description: createdTask.description,
            date: createdTask.date
        });
    }

    async function deleteTask(userId, taskId) {
        //validate if task exists
        await taskModel.destroy({ where: { id: taskId } });
        return getTaskStatistics(userId);
    }

    async function doListByUserAndCategory(userId, categoryId) {
        const tasks = await taskModel.findAll({
            where: { userId, categoryId, date: { [Op.gte]: new Date() } },
            order: [['date', 'DESC'], ['id', 'ASC']]
        });
        return baseService.getServiceResponse(200, 'Success', tasks.map(t => getTaskModel(t)));
    }

    function getTaskModel(task) {
        return {
            id: task.id,
            description: task.description,
            status: task.status,
            date: task.date
        };
    }

    async function countTasks(userId, categoryId) {
        const tasksCount = await taskModel.count({
            where: { userId, categoryId, date: { [Op.gte]: new Date() } }
        });
        return tasksCount;
    }

    async function countResolvedTasks(userId, categoryId) {
        const tasksCount = await taskModel.count({
            where: { userId, categoryId, status: true, date: { [Op.gte]: new Date() } }
        });
        return tasksCount;
    }

    async function getTaskStatistics(userId) {
        const personalTasks = await countTasks(userId, constants.PERSONAL_CATEGORY.id);
        const workTasks = await countTasks(userId, constants.WORK_CATEGORY.id);
        const homeTasks = await countTasks(userId, constants.HOME_CATEGORY.id);
        const resolvedPersonalTasks = await countResolvedTasks(userId, constants.PERSONAL_CATEGORY.id);
        const resolvedWorkTasks = await countResolvedTasks(userId, constants.WORK_CATEGORY.id);
        const resolvedHomeTasks = await countResolvedTasks(userId, constants.HOME_CATEGORY.id);

        return baseService.getServiceResponse(200, 'Success', {
            personalTasks,
            percentPersonalTasks: getTaskPercentage(resolvedPersonalTasks, personalTasks),
            workTasks,
            percentWorkTasks: getTaskPercentage(resolvedWorkTasks, workTasks),
            homeTasks,
            percentHomeTasks: getTaskPercentage(resolvedHomeTasks, homeTasks),
        });
    }

    function getTaskPercentage(resolved, total) {
        return Math.round((100 * resolved) / total) || 0;
    }

    async function updateTask(userId, taskId) {
        const task = await findById(taskId);
        task.status = !task.status;
        await task.save();
        return await getTaskStatistics(userId);
    }

    return {
        createTask,
        deleteTask,
        doListByUserAndCategory,
        getTaskStatistics,
        updateTask
    };
};