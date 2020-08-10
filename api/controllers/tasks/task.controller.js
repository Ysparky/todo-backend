'use strict';

const setupBaseController = require('./../base.controller');
const serviceContainer = require('./../../../services/service.container');

let baseController = new setupBaseController();

const get = async (request, response) => {
    let responseCode, responseData;
    try {
        const taskService = await serviceContainer('task');
        const taskData = await taskService.doListByUserAndCategory(request.params.userId, request.params.categoryId);
        responseCode = taskData.responseCode;
        responseData = responseCode == 200 ?
            baseController.getSuccessResponse(taskData.data, taskData.message) :
            baseController.getErrorResponse(taskData.data);
    } catch (error) {
        console.error('Error' + error);
        responseCode = 500;
        responseData = baseController.getErrorResponse('Error');
    }
    return response.status(responseCode).json(responseData);
};

const getTaskStatistics = async (request, response) => {
    let responseCode, responseData;
    try {
        const taskService = await serviceContainer('task');
        const taskData = await taskService.getTaskStatistics(request.params.userId);
        responseCode = taskData.responseCode;
        responseData = responseCode == 200 ?
            baseController.getSuccessResponse(taskData.data, taskData.message) :
            baseController.getErrorResponse(taskData.data);
    } catch (error) {
        console.error('Error' + error);
        responseCode = 500;
        responseData = baseController.getErrorResponse('Error');
    }
    return response.status(responseCode).json(responseData);
};

const post = async (request, response) => {
    let responseCode, responseData;
    try {
        const taskService = await serviceContainer('task');
        const task = {
            userId: request.params.userId,
            description: request.body.description && request.body.description.trim(),
            date: request.body.date && request.body.date.trim(),
            categoryId: request.body.categoryId && parseInt(request.body.categoryId)
        };
        const taskData = await taskService.createTask(task);
        responseCode = taskData.responseCode;
        responseData = responseCode == 200 ?
            baseController.getSuccessResponse(taskData.data, taskData.message) :
            baseController.getErrorResponse(taskData.data);
    } catch (error) {
        console.error('Error' + error);
        responseCode = 500;
        responseData = baseController.getErrorResponse('Error');
    }
    return response.status(responseCode).json(responseData);
};

const put = async (request, response) => {
    let responseCode, responseData;
    try {
        const taskService = await serviceContainer('task');
        const taskData = await taskService.updateTask(request.params.userId, request.body.taskId);
        responseCode = taskData.responseCode;
        responseData = responseCode == 200 ?
            baseController.getSuccessResponse(taskData.data, taskData.message) :
            baseController.getErrorResponse(taskData.data);
    } catch (error) {
        console.error('Error' + error);
        responseCode = 500;
        responseData = baseController.getErrorResponse('Error');
    }
    return response.status(responseCode).json(responseData);
};

const deleteTask = async (request, response) => {
    let responseCode, responseData;
    try {
        const taskService = await serviceContainer('task');
        const taskData = await taskService.deleteTask(request.params.userId, request.params.taskId);
        responseCode = taskData.responseCode;
        responseData = responseCode == 200 ?
            baseController.getSuccessResponse(taskData.data, taskData.message) :
            baseController.getErrorResponse(taskData.data);
    } catch (error) {
        console.error('Error' + error);
        responseCode = 500;
        responseData = baseController.getErrorResponse('Error');
    }
    return response.status(responseCode).json(responseData);
};

module.exports = {
    deleteTask,
    get,
    getTaskStatistics,
    post,
    put
};