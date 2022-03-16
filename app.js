const { inquirerMenu, pause, readInput, selectPlace } = require('./helpers/inquirer');
const Search = require('./models/searches');


const search = new Search();
require('colors');

const actions = async(opt) => {
    switch (opt) {
        case 1:

            let cities = await search.places(await readInput('Place: '));
            let obj_id = await selectPlace(cities);
            let obj = cities.find(place => place.id === obj_id);
            search.add_history(obj);
            await search.showInfoPlace(obj);
            break;
        case 2:
            search.show_history();
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
        search.save_db();
    }
    while (opt != 0);
}

main();