const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = new mongoose.Schema({
    /* eslint-disable camelcase */
    MGLT: {
        type: String,
        required: true
    },
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
    hyperdrive_rating: {
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
    starship_class: {
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
    collection: 'starships'
});

Schema.plugin(uniqueValidator);

module.exports = mongoose.model('Starships', Schema);
