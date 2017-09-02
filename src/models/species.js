const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = new mongoose.Schema({
    /* eslint-disable camelcase */
    average_height: {
        type: String,
        required: true
    },
    average_lifespan: {
        type: String,
        required: true
    },
    classification: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    eye_colors: {
        type: String,
        required: true
    },
    hair_colors: {
        type: String,
        required: true
    },
    homeworld: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    people: {
        type: Array
    },
    films: {
        type: Array
    },
    skin_colors: {
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
    collection: 'species'
});

Schema.plugin(uniqueValidator);

module.exports = mongoose.model('Species', Schema);
