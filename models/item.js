const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ItemSchema = new Schema ({
    user: {
        type: String,
        ref: 'users'
    },
    name: {
        type: String,
        ref: 'users'
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    img: [
        {
            url: {
                type: String
            },
            original: {
                type: String
            },
            name: {
                type: String
              }
        }
    ],
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
    },
    bid: {
        type: Number,
        required: false
    },
    reserve: {
        type: Boolean,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    service: {
        type: Date,
        required: false
    },
    material: {
        type: String,
        required: true
    },
    boxpapers: {
        type: String,
        required: true
    },
    thickness: {
        type: Number,
        required: true
    },
    crystal: {
        type: String,
        required: true
    },
    crown: {
        type: String,
        required: true
    },
    bezel: {
        type: String,
        required: true
    },
    wr: {
        type: Number,
        required: true
    },
    tested: {
        type: String,
        required: true
    },
    bidHistory: [
        {
            user: {
                type: String,
                ref: 'users'
            },
            name: {
                type: String
              },
            bid: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    comments: [
        {
            user: {
                type: String,
                ref: 'users'
            },
            name: {
                type: String
              },
            text: {
                type: String,
                required: true
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
      ]
});

module.exports = Item = mongoose.model('item', ItemSchema);