const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    storeId: {
        type: Schema.Types.ObjectId,
        ref: 'store'
    },
    name: {
        type: String
    },
    quantity: {
        type: Number
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    price: {
        type: Number
    },
    discountPrice: {
        type: Number
    },
    description: {
        type: String
    },
    images: {
        thumbnail: {
            type: String
        },
        front: {
            type: String
        },
        back: {
            type: String
        },
        left: {
            type: String
        },
        right: {
            type: String
        },
        up: {
            type: String
        },
        down: {
            type: String
        }
    },
    category: {
        type: String
    },
    inStock: {
        type: Number
    },
    variations: [
        {
            variant: {
                type: String
            },
            inStock: {
                type: String
            }
        }
    ]
})

module.exports = Products = mongoose.model('products', productSchema)