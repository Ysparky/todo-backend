'use strict';

const setupBaseController = require('./../base.controller');
const serviceContainer = require('./../../../services/service.container');

let baseController = new setupBaseController();

const login = async (request, response) => {
    if (!request.body.username || !request.body.password) {
        return response.status(400).json(baseController.getErrorResponse('Paramaters are missing'));
    }

    let responseCode;
    let responseData;

    try {
        let authenticationData = {
            username: request.body.username,
            password: request.body.password
        };
        const authenticationService = await serviceContainer('authentication');

        let loginData = await authenticationService.login(authenticationData);

        responseCode = loginData.responseCode;
        responseData = responseCode == 200 ?
            baseController.getSuccessResponse(loginData.data, loginData.message) :
            baseController.getErrorResponse(loginData.data);
    } catch (err) {
        console.error('Error logging in the application: ', err);
        responseCode = 500;
        responseData = baseController.getErrorResponse('Error logging in the application');
    }

    return response.status(responseCode).json(responseData);
};

module.exports = {
    login
};
