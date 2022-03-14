const axios = require('axios');
require('dotenv').config();
class Search {
    history = ['Buenos Aires', 'Madrid'];

    constructor() {
        // To-do = read DB if exists
    }
    get paramsMapbox() {
        return {
            'access_token': 'pk.eyJ1Ijoic2FtdWVsb250aSIsImEiOiJjbDBvdjVva2sxaWR0M2pvM2tpaWN4MjV4In0.mioRtLJIFUz4397iesr9TAd',
            'limit': 2,
            'language': 'es',
            'type': 'place%2Cpostcode%2Caddress'

        }
    }
    async city(place = '') {
        try {

            // http request
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: {
                    'access_token': process.env.MAPBOX_KEY,
                    'limit': 2,
                    'language': 'es',
                    'type': 'place%2Cpostcode%2Caddress'
                }
            });
            const resp = await instance.get();

            console.log(resp.data);
        } catch (error) {
            return [];
        }
    }
    showInfoCity() {
        console.log('\nCity Information\n'.green);
        console.log('City', );
        console.log('Lat', );
        console.log('Lng', );
        console.log('Temperature', );
        console.log('Minimun', );
        console.log('Maximum', );
    }
}
module.exports = Search;