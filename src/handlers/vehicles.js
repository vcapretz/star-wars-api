const Joi = require('joi');
const rp = require('request-promise');

const { Vehicles } = require('../models');

const vehiclesPostPayloadValidation = {
    /* eslint-disable camelcase */
    created: Joi.string().optional(),
    edited: Joi.string().optional(),
    cargo_capacity: Joi.string().required(),
    consumables: Joi.string().required(),
    cost_in_credits: Joi.string().required(),
    crew: Joi.string().required(),
    length: Joi.string().required(),
    manufacturer: Joi.string().required(),
    max_atmosphering_speed: Joi.string().required(),
    model: Joi.string().required(),
    name: Joi.string().required(),
    passengers: Joi.string().required(),
    vehicle_class: Joi.string().required(),
    url: Joi.string().required(),
    films: Joi.array().required(),
    pilots: Joi.array().required()
    /* eslint-enable camelcase */
};

module.exports.getAll = {
    handler: async (request, reply) => {
        return reply({ items: await Vehicles.find() });
    }
};

module.exports.getById = {
    handler: async (request, reply) => {
        const getOne = await Vehicles.findById(request.params.id);

        return reply({ items: getOne });
    }
};

module.exports.create = {
    handler: async (request, reply) => {
        let data;

        try {
            data = await Vehicles.create(request.payload);
        } catch (err) {
            return reply({ result: 'it was not possible to create your document', err })
                .code(400);
        }

        return reply({ result: { message: 'success on creating new document', data } }).code(201);
    },
    validate: {
        payload: vehiclesPostPayloadValidation
    }
};

module.exports.edit = {
    handler: async (request, reply) => {
        let data;

        try {
            data = await Vehicles.update({ _id: request.params.id }, request.payload);
        } catch (err) {
            return reply({ result: 'it was not possible to update your document', err })
                .code(400);
        }

        return reply({ result: { message: 'success on updating', data } }).code(201);
    },
    validate: {
        payload: vehiclesPostPayloadValidation
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
            data = await Vehicles.create(list);
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
