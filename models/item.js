const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ItemSchema = new Schema ({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    reference_number: {
        type: String,
        required: true
    },
    movement: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    case_diameter: {
        type: Number,
        required: true
    },
    lug_width: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);