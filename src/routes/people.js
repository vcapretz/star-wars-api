const peopleHandler = require('../handlers/people');

module.exports = [
    { method: 'GET', path: '/people', config: peopleHandler.getAll },
    { method: 'GET', path: '/people/{id}', config: peopleHandler.getById },
    { method: 'POST', path: '/people', config: peopleHandler.create },
    { method: 'PUT', path: '/people/{id}', config: peopleHandler.edit },
    { method: 'DELETE', path: '/people/{id}', config: peopleHandler.delete },
    { method: 'POST', path: '/people/import', config: peopleHandler.import }
];
