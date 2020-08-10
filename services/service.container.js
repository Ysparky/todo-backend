'use strict';

const setupServices = require('./');

let services;

module.exports = async function serviceContainer(serviceName) {
    if (!services) {
        services = await setupServices();
    }
    // Return requested service
    switch (serviceName) {
        case 'authentication':
            return services.authenticationService;
        case 'task':
            return services.taskService;
        case 'user':
            return services.userService;
    }
};