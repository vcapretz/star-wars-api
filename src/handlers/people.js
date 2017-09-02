const Joi = require('joi');
const rp = require('request-promise');

const { People } = require('../models');

const peoplePostPayloadValidation = {
    /* eslint-disable camelcase */
    birth_year: Joi.string().required(),
    created: Joi.string().optional(),
    edited: Joi.string().optional(),
    eye_color: Joi.string().required(),
    films: Joi.array().optional(),
    gender: Joi.string().required(),
    hair_color: Joi.string().required(),
    height: Joi.string().required(),
    homeworld: Joi.string().required(),
    mass: Joi.string().required(),
    name: Joi.string().required(),
    skin_color: Joi.string().required(),
    species: Joi.array().optional(),
    starships: Joi.array().optional(),
    url: Joi.string().optional(),
    vehicles: Joi.array().optional()
    /* eslint-enable camelcase */
};

module.exports.getAll = {
    handler: async (request, reply) => {
        return reply({ items: await People.find() });
    }
};

module.exports.getById = {
    handler: async (request, reply) => {
        const getOne = await People.findById(request.params.id);

        return reply({ items: getOne });
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
        try {
            await People.update({ _id: request.params.id }, request.payload);
        } catch (err) {
            return reply({ result: 'it was not possible to update your document', err })
                .code(400);
        }

        return reply({ result: { message: 'success on updating', data: await People.findById(request.params.id) } }).code(201);
    },
    validate: {
        payload: peoplePostPayloadValidation
    }
};

module.exports.delete = {
    handler: async (request, reply) => {
        try {
            await People.findByIdAndRemove(request.params.id);
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
