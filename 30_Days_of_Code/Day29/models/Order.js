const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    referenceId: {
        type: String
    },
    customer: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        phone: {
            type: String
        },
        email: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now()
    },
    shippingAddress: {
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
    status: {
        type: String,
        enum: ['Sent', 'In-transit', 'Delivered']
    },
    paid: {
        type: Boolean,
        default: false
    }
})

module.exports = Order = mongoose.model('order', orderSchema)