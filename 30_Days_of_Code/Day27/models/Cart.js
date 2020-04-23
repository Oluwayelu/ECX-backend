const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    dateCreated: {
        type: String,
        default: Date.now()
    },
    products: [
        {   
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'products',
                required: [true, 'productId is required']
            },
            storeId: {
                type: Schema.Types.ObjectId,
                ref: 'store',
                required: [true, 'storeId required']
            },
            name: {
                type: String,
                required: [true, 'product name required']
            },
            quantity: {
                type: String,
                required: [true, 'product quantity required']
            },
            price: {
                type: String,
                required: [true, 'product price required']
            }
        }
    ]
}, {
    timestamps: true
})

cartSchema.index({ createdAt: 1}, { expireAfterSeconds: 10 })

module.exports = Cart = mongoose.model('cart', cartSchema)