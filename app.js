const { inquirerMenu, pause } = require('./helpers/inquirer');
const Search = require('./models/searches');
require('colors');

const actions = async(opt) => {
    switch (opt) {
        case 1:

            console.log('\nCity Information\n'.green);
            console.log('City', );
            console.log('Lat', );
            console.log('Lng', );
            console.log('Temperature', );
            console.log('Minimun', );
            console.log('Maximum', );
            break;

        default:
            break;
    }
}
const main = async() => {
    let opt;
    const search = new Search();
    do {
        opt = await inquirerMenu();
        await actions(opt);
        await pause();
    }
    while (opt != 0);
}

main();