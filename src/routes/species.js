const speciesHandler = require('../handlers/species');

module.exports = [
    { method: 'GET', path: '/species', config: speciesHandler.getAll },
    { method: 'GET', path: '/species/{id}', config: speciesHandler.getById },
    { method: 'POST', path: '/species', config: speciesHandler.create },
    { method: 'PUT', path: '/species/{id}', config: speciesHandler.edit },
    { method: 'POST', path: '/species/import', config: speciesHandler.import }
];
