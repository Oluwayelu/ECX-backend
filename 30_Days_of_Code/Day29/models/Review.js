const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product'
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
    verified: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    rating: {
        type: Number
    },
    store: {
        storeId: {
            type: Schema.Types.ObjectId,
            ref: 'store'
        },
        name: {
            type: String
        }
    }
})

module.exports = Review = mongoose.model('review', reviewSchema)