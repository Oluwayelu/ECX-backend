const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: [true, 'Email already exists']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: [true, 'Phone number already exists']
    }, 
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: [6, 'Password should be at least 6 chars']
    },
    amount: {
        type: Number,
        default: 0
    },
    transactionLogs: {
        type: Array,
        default: []
    },
    transactionPin: {
        type: String,
        required: [true, 'Transction Pin required']
    }
})

module.exports = User = mongoose.model('User', userSchema)