const mongoose = require('mongoose');
const { databaseConfig } = require('./config');

module.exports.connectDatabase = () => {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;
        mongoose.connection
            .on('error', error => reject(error))
            .on('close', () => console.log('Database connection closed.'))
            .once('open', () => resolve(mongoose.connections[0]));

        mongoose.connect(databaseConfig, { useMongoClient: true });
    });
};
