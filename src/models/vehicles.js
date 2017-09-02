const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = new mongoose.Schema({
    /* eslint-disable camelcase */
    cargo_capacity: {
        type: String,
        required: true
    },
    consumables: {
        type: String,
        required: true
    },
    cost_in_credits: {
        type: String,
        required: true
    },
    crew: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    max_atmosphering_speed: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    passengers: {
        type: String,
        required: true
    },
    films: {
        type: Array
    },
    pilots: {
        type: Array
    },
    vehicle_class: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
    /* eslint-enable camelcase */
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'edited'
    },
    collection: 'vehicles'
});

Schema.plugin(uniqueValidator);

module.exports = mongoose.model('Vehicles', Schema);
