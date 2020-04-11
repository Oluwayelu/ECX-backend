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
    password: {
        type: String,
        minlength: 6
    },
    date: {
        type: String
    },
    time: {
        type: String
    }
})

module.exports = User = mongoose.model('User', userSchema)