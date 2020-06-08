const axios = require('axios');

    const api = axios.create({

        baseURL : 'https://api.imgur.com',
    })

   module.exports = api;