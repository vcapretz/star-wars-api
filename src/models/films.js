const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = new mongoose.Schema({
    /* eslint-disable camelcase */
    characters: {
        type: Array
    },
    director: {
        type: String,
        required: true
    },
    episode_id: {
        type: String,
        required: true
    },
    opening_crawl: {
        type: String,
        required: true
    },
    planets: {
        type: Array
    },
    producer: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    species: {
        type: Array
    },
    starships: {
        type: Array
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String
    },
    vehicles: {
        type: Array
    }
    /* eslint-enable camelcase */
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'edited'
    },
    collection: 'films'
});

Schema.plugin(uniqueValidator);

module.exports = mongoose.model('Films', Schema);
