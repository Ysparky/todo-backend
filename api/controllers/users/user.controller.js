'use strict';

const setupBaseController = require('./../base.controller');
const serviceContainer = require('./../../../services/service.container');

let baseController = new setupBaseController();

const post = async (request, response) => {
    if (!request.body.username || !request.body.email || !request.body.password) {
        return response.status(400).json(baseController.getErrorResponse('Paramaters are missing'));
    }
    let responseCode, responseData;
    try {
        const userService = await serviceContainer('user');
        const user = {
            username: request.body.username && request.body.username.trim(),
            email: request.body.email && request.body.email.trim(),
            password: request.body.password && request.body.password.trim()
        };
        const userData = await userService.createUser(user);
        responseCode = userData.responseCode;
        responseData = responseCode == 200 ?
            baseController.getSuccessResponse(userData.data, userData.message) :
            baseController.getErrorResponse(userData.data);
    } catch (error) {
        console.error('Error' + error);
        responseCode = 500;
        responseData = baseController.getErrorResponse('Error');
    }
    return response.status(responseCode).json(responseData);
};

module.exports = {
    post
};