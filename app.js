const { inquirerMenu, pause, readInput } = require('./helpers/inquirer');
const Search = require('./models/searches');


const search = new Search();
require('colors');

const actions = async(opt) => {
    switch (opt) {
        case 1:
            data = await readInput('City: ');

            await search.city(data);
            break;

        default:
            break;
    }
}
const main = async() => {
    let opt;
    do {
        opt = await inquirerMenu();
        await actions(opt);
        await pause();
    }
    while (opt != 0);
}

main();