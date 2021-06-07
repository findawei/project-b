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
    dealership: {
        type: String
    },
    dealerwebsite: {
        type: String
    },
    fees: {
        type: String
    },
    link: {
        type: String
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
    },
    year: {
        type: String,
        required: true
    },
    case_diameter: {
        type: Number,
    },
    lug_width: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
    },
    bid: {
        type: Number,
    },
    reserve: {
        type: Number,
    },
    endDate: {
        type: Date,
    },
    location: {
        type: String,
    },
    service: {
        type: Date,
    },
    material: {
        type: String,
    },
    boxpapers: {
        type: String,
    },
    thickness: {
        type: Number,
    },
    crystal: {
        type: String,
    },
    crown: {
        type: String,
         
    },
    bezel: {
        type: String,
         
    },
    wr: {
        type: Number,
         
    },
    tested: {
        type: String,
         
    },
    status: {
        type: String
    },
    referral: {
        type: String
    },
    phone: {
        type: Number
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