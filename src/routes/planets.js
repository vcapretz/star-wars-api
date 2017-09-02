const planetsHandler = require('../handlers/planets');

module.exports = [
    { method: 'GET', path: '/planets', config: planetsHandler.getAll },
    { method: 'GET', path: '/planets/{id}', config: planetsHandler.getById },
    { method: 'POST', path: '/planets', config: planetsHandler.create },
    { method: 'PUT', path: '/planets/{id}', config: planetsHandler.edit },
    { method: 'DELETE', path: '/planets/{id}', config: planetsHandler.delete },
    { method: 'POST', path: '/planets/import', config: planetsHandler.import }
];
