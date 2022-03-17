const inquirer = require('inquirer');
//const Task = require('../models/task');
require('colors');

const menuOpt = [{
    type: 'list',
    name: 'option',
    message: 'What you want to do? ',
    choices: [{
            value: 1,
            name: `${'1.'.green} Search Place`
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
const selectPlace = async(places = []) => {
    var idx = '';
    const choices = places.map((place, indice) => {
        idx = `${indice+1}.`.green
        return {
            value: place.id,
            name: `${idx} ${place.name}`
        }
    });

    const questions = [{
        type: 'list',
        name: 'option',
        message: 'Select One',
        choices
    }]
    const { option } = await inquirer.prompt(questions);
    return option;
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
        message: `Press ${'Enter'.green} to continue`

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

module.exports = {
    inquirerMenu,
    pause,
    selectPlace,
    readInput
}