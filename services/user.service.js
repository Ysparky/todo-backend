'use strict';

const bcrypt = require('bcrypt');

const constants = require('./constants');
const setupBaseService = require('./base.service');

module.exports = function setupUserService(userModel) {
    let baseService = new setupBaseService();

    async function create(user) {
        return await userModel.create(user);
    }

    async function createUser(user) {
        let errors = [];
        await validateUserCreate(user, errors);
        console.error(errors);
        if (errors.length > 0) {
            return baseService.getServiceResponse(400, 'Error', errors.join('\n'));
        }
        let password = await bcrypt.hash(user.password, constants.BCRYPT_WORK_FACTOR);
        const createdUser = await create({
            username: user.username,
            email: user.email,
            password
        });
        return baseService.getServiceResponse(200, 'Success', {
            id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email
        });
    }
    //#region Validation
    async function validateUserCreate(user, errors) {
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!emailRegex.test(user.email)) {
            return errors.push('Correo con formato incorrecto');
        }
        if (await emailExists(user.email)) {
            errors.push('El correo ingresado ya existe');
        }
        if (await usernameExists(user.username)) {
            errors.push('El nombre de usuario ingresado ya existe');
        }
    }

    async function emailExists(email) {
        const user = await userModel.findOne({ where: { email } });
        return user ? true : false;
    }

    async function usernameExists(username) {
        const user = await userModel.findOne({ where: { username } });
        return user ? true : false;
    }
    //#endregion

    return {
        createUser
    };
};