const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = new mongoose.Schema({
    birth_year: {
        type: String,
        required: true
    },
    eye_color: {
        type: String,
        required: true
    },
    films: {
        type: Array
    },
    gender: {
        type: String,
        required: true
    },
    hair_color: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    homeworld: {
        type: String,
        required: true
    },
    mass: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    skin_color: {
        type: String,
        required: true
    },
    species: {
        type: Array
    },
    starships: {
        type: Array
    },
    url: {
        type: String,
    },
    vehicles: {
        type: Array
    },
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'edited'
    },
    collection: 'people'
});

Schema.plugin(uniqueValidator);

module.exports = mongoose.model('People', Schema);
