const Joi = require('joi');
const rp = require('request-promise');

const { Films } = require('../models');

const filmsPostPayloadValidation = {
    /* eslint-disable camelcase */
    created: Joi.string().optional(),
    edited: Joi.string().optional(),
    characters: Joi.array().required(),
    director: Joi.string().required(),
    episode_id: Joi.string().required(),
    opening_crawl: Joi.string().required(),
    planets: Joi.array().required(),
    species: Joi.array().required(),
    starships: Joi.array().required(),
    vehicles: Joi.array().required(),
    producer: Joi.string().required(),
    release_date: Joi.string().required(),
    title: Joi.string().required(),
    url: Joi.string().required()
    /* eslint-enable camelcase */
};

module.exports.getAll = {
    handler: async (request, reply) => {
        return reply({ items: await Films.find() });
    }
};

module.exports.getById = {
    handler: async (request, reply) => {
        const getOne = await Films.findById(request.params.id);

        return reply({ items: getOne });
    }
};

module.exports.create = {
    handler: async (request, reply) => {
        let data;

        try {
            data = await Films.create(request.payload);
        } catch (err) {
            return reply({ result: 'it was not possible to create your document', err })
                .code(400);
        }

        return reply({ result: { message: 'success on creating new document', data } }).code(201);
    },
    validate: {
        payload: filmsPostPayloadValidation
    }
};

module.exports.edit = {
    handler: async (request, reply) => {
        let data;

        try {
            data = await Films.update({ _id: request.params.id }, request.payload);
        } catch (err) {
            return reply({ result: 'it was not possible to update your document', err })
                .code(400);
        }

        return reply({ result: { message: 'success on updating', data } }).code(201);
    },
    validate: {
        payload: filmsPostPayloadValidation
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
            data = await Films.create(list);
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
