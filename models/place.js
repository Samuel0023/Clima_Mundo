const Api = require('../helpers/api');
const api = require('../helpers/api');
class Place {
    temp = 0;
    temp_max = 0;
    temp_min = 0;
    desc_weather = '';
    constructor(id, name, lat, lng) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }
    fist_name(name) {
        return name.split(',').shift();
    }
    async set_temperature() {

        let api = new Api();
        console.log(this.fist_name(this.name));
        let weather = await api.req_temperature(this.lat, this.lng, this.fist_name(this.name));

        this.temp = weather.temp;
        this.temp_min = weather.min;
        this.temp_max = weather.max;
        this.desc_weather = weather.desc

    }
}

module.exports = Place;