module.exports.indexRoute = {
    handler: (request, reply) => {
        return reply({ result: 'Index route for the API, see "/people"' });
    }
};

module.exports.notFound = {
    handler: (request, reply) => {
        return reply({ result: `404 error page, the path you are trying to access doesn't exists` })
            .code(404);
    }
};
