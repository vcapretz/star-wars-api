const vehiclesHandler = require('../handlers/vehicles');

module.exports = [
    { method: 'GET', path: '/vehicles', config: vehiclesHandler.getAll },
    { method: 'GET', path: '/vehicles/{id}', config: vehiclesHandler.getById },
    { method: 'POST', path: '/vehicles', config: vehiclesHandler.create },
    { method: 'PUT', path: '/vehicles/{id}', config: vehiclesHandler.edit },
    { method: 'DELETE', path: '/vehicles/{id}', config: vehiclesHandler.delete },
    { method: 'POST', path: '/vehicles/import', config: vehiclesHandler.import }
];
