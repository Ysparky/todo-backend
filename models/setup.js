'use strict';

const inquirer = require('inquirer');
const chalk = require('chalk');
const dbInstance = require('.');

const prompt = inquirer.createPromptModule();

async function setup() {
    const answer = await prompt([
        {
            type: 'confirm',
            name: 'setup',
            message: 'This will destroy your database, are you sure?'
        }
    ]);

    if (!answer.setup) {
        return console.log('Nothing to be worry');
    }

    const db = await dbInstance(true).catch(handleFatalError);
    console.log('Success');
    process.exit(0);
}

function handleFatalError(err) {
    console.error(`${chalk.red('[Fatal error]')} ${err.message}`);
    console.error(err.stack);
    process.exit(1);
}
setup();