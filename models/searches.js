const fs = require('fs');
const Api = require('../helpers/api');
const Place = require('./place');
require('dotenv').config();
class Search {
    history = [];
    dbPath = './db/database.json';
    constructor() {
        this.api = new Api();
        this.read_db();
    }
    async places(place = '') {
        try {

            // http request

            const resp = await this.api.req_places(place);

            return resp.data.features.map(place => {
                return new Place(place.id, place.place_name, place.center[0], place.center[1]);
            });
        } catch (error) {
            return [];
        }
    }
    async showInfoPlace(place) {
        await place.set_temperature();
        console.log('\nPlace Information\n'.green);
        console.log('Address ', `${place.name}`.green);
        console.log('Lat', `${place.lat}`.green);
        console.log('Lng', `${place.lng}`.green);
        console.log('Description', `${place.desc_weather}`.green);
        console.log('Temperature', `${place.temp}`.green);
        console.log('Minimun', `${place.temp_min}`.green);
        console.log('Maximum', `${place.temp_max}`.green);
    }
    add_history(place) {
        if (!(this.history.includes(place.name))) {
            this.history.unshift(place.name);
        }
    }
    show_history() {
        let idx;
        this.history.forEach((place, indice) => {
            idx = `${indice+1}.`.green
            console.log(`${idx} ${place}`);
        });
    }
    save_db() {
        const payload = {
            history: this.history
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }
    read_db() {
        if (fs.existsSync(this.dbPath)) {
            let data = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
            console.log(JSON.parse(data));
            this.history = (JSON.parse(data)).history;
        }
    }
    delete_duplicate() {
        this.history = Array.from(new Set(this.history));
    }
}
module.exports = Search;