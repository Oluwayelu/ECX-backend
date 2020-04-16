const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        unique: true
    },
    username: {
        type: String,
        unique: true
    }, 
    names: {
        type: Array,
        default: []
    },
    occupation: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        minlength: 6
    },
    lastLogin: {
        type: Date
    }
})

module.exports = User = mongoose.model('User', userSchema)