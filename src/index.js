const indexRoutes = require('./handlers/index');
const filmsRoutes = require('./routes/films');
const peopleRoutes = require('./routes/people');
const planetsRoutes = require('./routes/planets');
const speciesRoutes = require('./routes/species');
const starshipsRoutes = require('./routes/starships');
const vehiclesRoutes = require('./routes/vehicles');

exports.register = (plugin, options, next) => {
    plugin.route([
        { method: 'GET', path: '/', config: indexRoutes.indexRoute }
    ].concat(
        filmsRoutes,
        peopleRoutes,
        planetsRoutes,
        speciesRoutes,
        starshipsRoutes,
        vehiclesRoutes,
        [{ method: 'GET', path: '/{path*}', config: indexRoutes.notFound }]
    ));

    next();
};

exports.register.attributes = {
    name: 'api'
};
