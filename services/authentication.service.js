'use strict';

const bcrypt = require('bcrypt');
const setupBaseService = require('./base.service');

module.exports = function setupAuthenticationService(userModel) {
    const baseService = new setupBaseService();

    async function login(data) {
        const user = await userModel.findOne({ where: { username: data.username } });
        const passwordMatch = !user ? false : await bcrypt.compare(data.password, user.password);
        if (!passwordMatch) {
            return baseService.getServiceResponse(404, 'Not Found', {});
        }
        return baseService.getServiceResponse(200, 'Success', {
            id: user.id,
            username: user.username,
            email: user.email
        });
    }

    return {
        login
    };
};