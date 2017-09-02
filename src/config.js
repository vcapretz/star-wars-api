const dBdevelopment = process.env.MONGO_URL || 'mongodb://localhost/sw-api';
const dBproduction = process.env.MONGO_URL || 'mongodb://localhost/sw-api';

module.exports.databaseConfig = (process.env.NODE_ENV === 'production') ? dBproduction : dBdevelopment;
module.exports.swApiUrl = 'https://swapi.co/api/';
