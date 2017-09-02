const filmsHandler = require('../handlers/films');

module.exports = [
    { method: 'GET', path: '/films', config: filmsHandler.getAll },
    { method: 'GET', path: '/films/{id}', config: filmsHandler.getById },
    { method: 'POST', path: '/films', config: filmsHandler.create },
    { method: 'PUT', path: '/films/{id}', config: filmsHandler.edit },
    { method: 'POST', path: '/films/import', config: filmsHandler.import }
];
