const axios = require('axios');
require('dotenv').config();
class Api {
    constructor() {}
    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es',
            'type': 'place%2Cpostcode%2Caddress'

        }
    }
    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric'
        }
    }
    async req_places(name = '') {
            try {
                // http request
                let instance = axios.create({
                    baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${name}.json`,
                    params: this.paramsMapbox
                });

                return await instance.get();

            } catch (error) {
                console.log(error);
            }
        }
        // lat , lon and name place
    async req_temperature(lat, lon, q) {
        try {
            let instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeather, lat, lon, q }
            });

            const res = await instance.get();
            const { weather, main } = res.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = Api;