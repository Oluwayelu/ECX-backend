const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const jwtSecret = require('../config/keys').secretKey

exports.createUser = (req, res) => {
    const newUser = new User(req.body)

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash
            newUser.save()
                .then(() => res.status(200).json({ success: true, msg: 'user registered' }))
                .catch(() => res.status(400).json({ success: false, msg: 'An error occured' }))
        })
    })
}

exports.loginUser = (req, res) => {
    const { email, password } = req.body

    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ success: false, msg: 'Invalid credentials' })
            
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(!isMatch) return res.status(400).json({ success: false, msg: 'Invalid credentials' })

                const payload = { 
                    id: user._id, 
                    email: user.email,
                }

                jwt.sign(
                    payload,
                    jwtSecret,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if(err) return res.status(400).json({success: false, msg: 'Error occured while creating a token' })
                         
                        User.findOneAndUpdate(
                            { email: user.email }, 
                            { lastLogin: Date.now()}, 
                            { new: true})
                            .then(() => {
                                res.status(200).json({
                                    success: true,
                                    token: "Bearer " + token,
                                    msg: "User logged in"
                                })
                            })
                            .catch(() => res.status(400).json({ success: false, msg: 'Could not update user'}))
                    })
            })
        })
}

exports.getUserId = (req, res) => {
    const { id } = req.params
    
    User.findById(id, { password: 0 })
        .then(user => {
            if(req.user.email !== user.email) return res.status(400).json({ success: false, msg: 'user is not authorized' })

            res.status(200).json(user)
        })
        .catch(() => res.status(400).json({ success: false, msg: 'User does not exist' }))
}

exports.updateUser = (req, res) => {
    const { id } = req.params

    User.findOneAndUpdate(
        { _id: id }, 
        req.body, 
        { new: true})
        .then(user => {
            if(user.email !== req.user.email) return res.status(400).json({ success: false, msg: 'user is not authorized' })

            res.status(200).json({ success: true, msg: 'User updated' })
        })
        .catch(() => res.status(400).json({ success: false, msg: 'Could not update user'}))
}

exports.deleteUser = (req, res) => {
    const { id } = req.params

    User.findOneAndDelete({ _id: id })
        .then(user => {
            if(user.email !== req.user.email) return res.status(400).json({ success: false, msg: 'user is not authorized' })

            res.status(200).json({ success: true, msg: 'user account has been deleted' })
        })
        .catch(() => res.status(400).json({ success: false, msg: 'Could not delete user'}))
}