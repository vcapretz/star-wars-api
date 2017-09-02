const Joi = require('joi');
const rp = require('request-promise');

const { Species } = require('../models');

const speciesPostPayloadValidation = {
    /* eslint-disable camelcase */
    created: Joi.string().optional(),
    edited: Joi.string().optional(),
    average_height: Joi.string().required(),
    average_lifespan: Joi.string().required(),
    classification: Joi.string().required(),
    designation: Joi.string().required(),
    eye_colors: Joi.string().required(),
    hair_colors: Joi.string().required(),
    homeworld: Joi.string().required(),
    name: Joi.string().required(),
    skin_colors: Joi.string().required(),
    url: Joi.string().optional(),
    people: Joi.array().optional(),
    films: Joi.array().optional()
    /* eslint-enable camelcase */
};

module.exports.getAll = {
    handler: async (request, reply) => {
        return reply({ items: await Species.find() });
    }
};

module.exports.getById = {
    handler: async (request, reply) => {
        const getOne = await Species.findById(request.params.id);

        return reply({ items: getOne });
    }
};

module.exports.create = {
    handler: async (request, reply) => {
        let data;

        try {
            data = await Species.create(request.payload);
        } catch (err) {
            return reply({ result: 'it was not possible to create your document', err })
                .code(400);
        }

        return reply({ result: { message: 'success on creating new document', data } }).code(201);
    },
    validate: {
        payload: speciesPostPayloadValidation
    }
};

module.exports.edit = {
    handler: async (request, reply) => {
        try {
            await Species.update({ _id: request.params.id }, request.payload);
        } catch (err) {
            return reply({ result: 'it was not possible to update your document', err })
                .code(400);
        }

        return reply({ result: { message: 'success on updating', data: await Species.findById(request.params.id) } }).code(201);
    },
    validate: {
        payload: speciesPostPayloadValidation
    }
};

module.exports.delete = {
    handler: async (request, reply) => {
        try {
            await Species.findByIdAndRemove(request.params.id);
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
            data = await Species.create(list);
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
