const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = new mongoose.Schema({
    /* eslint-disable camelcase */
    climate: {
        type: String,
        required: true
    },
    diameter: {
        type: String,
        required: true
    },
    films: {
        type: Array
    },
    gravity: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    orbital_period: {
        type: String,
        required: true
    },
    population: {
        type: String,
        required: true
    },
    residents: {
        type: Array
    },
    rotation_period: {
        type: String,
        required: true
    },
    surface_water: {
        type: String,
        required: true
    },
    terrain: {
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
    collection: 'planets'
});

Schema.plugin(uniqueValidator);

module.exports = mongoose.model('Planets', Schema);
