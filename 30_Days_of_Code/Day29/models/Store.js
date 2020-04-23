const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: [true, 'Store name is required']
    },
    email: {
        type: String
    },
    description: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    verified: {
        type: Boolean,
        default: false
    },
    suspended: {
        type: Boolean,
        default: false
    },
    address: {
        street: {
            type: String
        },
        state: {
            type: String
        },
        city: {
            type: String
        },
        zipcode: {
            type: String
        },
        country: {
            type: String
        }
    },
    category: {
        type: String
    },
    logo: {
        type: String
    },
    phone: {
        type: String
    },
    banner: {
        type: String
    }
})

module.exports = Store = mongoose.model('store', storeSchema)