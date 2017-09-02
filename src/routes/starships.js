const starshipsHandler = require('../handlers/starships');

module.exports = [
    { method: 'GET', path: '/starships', config: starshipsHandler.getAll },
    { method: 'GET', path: '/starships/{id}', config: starshipsHandler.getById },
    { method: 'POST', path: '/starships', config: starshipsHandler.create },
    { method: 'PUT', path: '/starships/{id}', config: starshipsHandler.edit },
    { method: 'DELETE', path: '/starships/{id}', config: starshipsHandler.delete },
    { method: 'POST', path: '/starships/import', config: starshipsHandler.import }
];
