const inquirer = require('inquirer');
//const Task = require('../models/task');
require('colors');

const menuOpt = [{
    type: 'list',
    name: 'option',
    message: 'What you want to do? ',
    choices: [{
            value: 1,
            name: `${'1.'.green} Search City`
        },
        {
            value: 2,
            name: `${'2.'.green} History`
        },
        {
            value: 0,
            name: `${'0.'.green} Leave`

        }

    ]
}]
const taskToDelete = async(tasks = []) => {
    var idx = '';
    const choices = tasks.map((task, indice) => {
        idx = `${indice+1}.`.green
        return {
            value: task.id,
            name: `${idx} ${task.desc}`
        }
    });

    const questions = [{
        type: 'list',
        name: 'option',
        message: 'Borrar',
        choices
    }]
    const { option } = await inquirer.prompt(questions);
    return option;
}
const taskCheckList = async(tasks = []) => {
    var idx = '';
    const choices = tasks.map((task, indice) => {
        idx = `${indice+1}.`.green
        return {
            value: task.id,
            name: `${idx} ${task.desc}`
        }
    });

    const questions = [{
        type: 'checkbox',
        name: 'ids',
        message: 'to Select',
        choices
    }]
    const { ids } = await inquirer.prompt(questions);
    return ids;
}

const inquirerMenu = async() => {
    console.clear();
    console.log(' ============================ '.green);
    console.log('   Select An Option '.white);
    console.log(' ============================ '.green);

    const { option } = await inquirer.prompt(menuOpt);

    return parseInt(option);
}


const pause = async() => {
    const { pausa } = await inquirer.prompt([{

        type: 'input',
        name: 'pausa',
        message: `Presione ${'Enter'.green} para continuar`

    }])
    console.log('\n');
    return pausa;

};

const readInput = async(message) => {
    const question = [{
        type: 'intput',
        name: 'city',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Please enter a value';
            }
            return true;
        }
    }]
    const { city } = await inquirer.prompt(question);
    console.log(city);
    return city;
}

const confirm = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }]
    const { ok } = await inquirer.prompt(question);
    return ok
}
module.exports = {
    inquirerMenu,
    pause,
    taskToDelete,
    taskCheckList,
    confirm,
    readInput
}