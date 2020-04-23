const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email already exists'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'phone number is required'],
        trim: true
    },
    password: {
        type: String
    },
    userType: {
        type: String,
        required: [true, 'user type is required'],
        enum: ['User', 'Admin'],
        default: 'User'
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    lastLogin: {
        type: Date
    },
    verified: {
        type: Boolean,
        default: false
    },
    addresses: [
        {   
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
        }
    ]
})

module.exports = User = mongoose.model('users', userSchema)