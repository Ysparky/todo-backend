const constants = require('./../services/constants');
const faker = require('faker');

function getCategories() {
    return [
        constants.PERSONAL_CATEGORY,
        constants.WORK_CATEGORY,
        constants.HOME_CATEGORY
    ];
}

async function seedCategories(model) {
    await model.bulkCreate(getCategories());
}

module.exports = {
    seedCategories
};