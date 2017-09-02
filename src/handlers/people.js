const Joi = require('joi');
const rp = require('request-promise');
const gju = require('geojson-utils');

const { People } = require('../models');

const peoplePostPayloadValidation = {
    birth_year: Joi.string().required(),
    eye_color: Joi.string().required(),
    films: Joi.array().required(),
    gender: Joi.string().required(),
    hair_color: Joi.string().required(),
    height: Joi.string().required(),
    homeworld: Joi.string().required(),
    mass: Joi.string().required(),
    name: Joi.string().required(),
    skin_color: Joi.string().required(),
    species: Joi.array().required(),
    starships: Joi.array().required(),
    url: Joi.string().required(),
    vehicles: Joi.array().required(),
};

module.exports.getAll = {
    handler: async (request, reply) => {
        return reply({ items: await People.find() });
    }
};

module.exports.getById = {
    handler: async (request, reply) => {
        const getPerson = await People.findById(request.params.id);

        return reply({ items: getPerson });
    }
};

module.exports.create = {
    handler: async (request, reply) => {
        let data;

        try {
            data = await People.create(request.payload);
        } catch (err) {
            return reply({ result: 'it was not possible to create your document', err })
                .code(400);
        }

        return reply({ result: { message: 'success on creating new document', data } }).code(201);
    },
    validate: {
        payload: peoplePostPayloadValidation
    }
};

module.exports.edit = {
    handler: async (request, reply) => {
        let data;

        try {
            data = await People.create(request.payload);
        } catch (err) {
            return reply({ result: 'it was not possible to create your document', err })
                .code(400);
        }

        return reply({ result: { message: 'success on creating new document', data } }).code(201);
    },
    validate: {
        payload: peoplePostPayloadValidation
    }
};

module.exports.import = {
    handler: async (request, reply) => {
        let data;
        let list;

        const externalData = await rp.get(request.payload.url, { encoding: 'utf-8', json: true });

        if (!externalData) {
            return reply({ result: 'failed to fetch URL' })
                .code(400);
        }

        if (!externalData.results && !externalData.name) {
            return reply({ result: 'the content provided must have an array of results or just one in the root' })
                .code(400);
        }

        list = externalData.results ? externalData.results : externalData;

        try {
            data = await People.create(list);
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
