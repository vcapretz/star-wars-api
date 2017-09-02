const indexRoutes = require('./handlers/index');
const peopleRoutes = require('./handlers/people');

exports.register = (plugin, options, next) => {
    plugin.route([
        { method: 'GET', path: '/', config: indexRoutes.indexRoute },
        { method: 'GET', path: '/people', config: peopleRoutes.getAll },
        { method: 'GET', path: '/people/{id}', config: peopleRoutes.getById },
        { method: 'POST', path: '/people', config: peopleRoutes.create },
        { method: 'PUT', path: '/people/{id}', config: peopleRoutes.edit },
        { method: 'POST', path: '/people/import', config: peopleRoutes.import },
        { method: 'GET', path: '/{path*}', config: indexRoutes.notFound }
    ]);

    next();
};

exports.register.attributes = {
    name: 'api'
};
