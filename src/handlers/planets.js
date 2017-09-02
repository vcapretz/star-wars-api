const Joi = require('joi');
const rp = require('request-promise');

const { Planets } = require('../models');

const planetsPostPayloadValidation = {
    /* eslint-disable camelcase */
    created: Joi.string().optional(),
    edited: Joi.string().optional(),
    climate: Joi.string().required(),
    diameter: Joi.string().required(),
    gravity: Joi.string().required(),
    name: Joi.string().required(),
    orbital_period: Joi.string().required(),
    population: Joi.string().required(),
    rotation_period: Joi.string().required(),
    surface_water: Joi.string().required(),
    terrain: Joi.string().required(),
    url: Joi.string().optional(),
    films: Joi.array().required(),
    residents: Joi.array().required()
    /* eslint-enable camelcase */
};

module.exports.getAll = {
    handler: async (request, reply) => {
        return reply({ items: await Planets.find() });
    }
};

module.exports.getById = {
    handler: async (request, reply) => {
        const getOne = await Planets.findById(request.params.id);

        return reply({ items: getOne });
    }
};

module.exports.create = {
    handler: async (request, reply) => {
        let data;

        try {
            data = await Planets.create(request.payload);
        } catch (err) {
            return reply({ result: 'it was not possible to create your document', err })
                .code(400);
        }

        return reply({ result: { message: 'success on creating new document', data } }).code(201);
    },
    validate: {
        payload: planetsPostPayloadValidation
    }
};

module.exports.edit = {
    handler: async (request, reply) => {
        try {
            await Planets.update({ _id: request.params.id }, request.payload);
        } catch (err) {
            return reply({ result: 'it was not possible to update your document', err })
                .code(400);
        }

        return reply({ result: { message: 'success on updating', data: await Planets.findById(request.params.id) } }).code(201);
    },
    validate: {
        payload: planetsPostPayloadValidation
    }
};

module.exports.delete = {
    handler: async (request, reply) => {
        try {
            await Planets.findByIdAndRemove(request.params.id);
        } catch (err) {
            return reply({ result: 'it was not possible to delete your document', err })
                .code(400);
        }

        return reply({ result: { message: 'success on deleting' } }).code(201);
    }
};

module.exports.import = {
    handler: async (request, reply) => {
        let data;

        const externalData = await rp.get(request.payload.url, { encoding: 'utf-8', json: true });

        if (!externalData) {
            return reply({ result: 'failed to fetch URL' })
                .code(400);
        }

        if (!externalData.results && !externalData.name) {
            return reply({ result: 'the content provided must have an array of results or just one in the root' })
                .code(400);
        }

        const list = externalData.results ? externalData.results : externalData;

        try {
            data = await Planets.create(list);
        } catch (err) {
            return reply({ result: 'it was not possible to create your documents', err })
                .code(400);
        }

        return reply({ result: { message: 'success on import new documents', data } }).code(201);
    },
    validate: {
        payload: {
            url: Joi.string().required()
        }
    }
};
