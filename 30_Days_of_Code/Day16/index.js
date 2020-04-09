/*
Day 16 of 30 Days of Code

Write a program to check from two given numbers, whether one is positive and another one is negative

Created on Thur Apr 9 10:48:33pm 2020

@author: Oluwayelu Ifeoluwa
*/

const express = require('express')
const bcrypt = require('bcrypt')

const { emailValidator, passwordValidator } = require('./validator')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//Database
let user


// @route   POST /signup
// @desc    Register user
// @access  Public
app.post('/signup', (req, res) => {
    const { email, username, password } = req.body

    if(!emailValidator(email)) {
        res.status(400).json({ success: false, msg: 'Invalid email'})  
    } else {
        if(!passwordValidator(password)) {
            res.status(400).json({ success: false, msg: 'Password should be at least 6 charcters long' })
        } else {
            user = {
                email,
                username,
                password
            }
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    user.password = hash
                    res.status(200).json({ success: true, msg: 'User registered' })
                })
            })
        }
    }
})

// @route   POST /login
// @desc    Login User
// @access  Public
app.post('/login', (req, res) => {
    const { email, password } = req.body

    if(!emailValidator(email)) {
        res.status(400).json({ success: false, msg: 'Invalid email'})  
    } else {
        if(!passwordValidator(password)) {
            res.status(400).json({ success: false, msg: 'Password should be at least 6 charcters long' })
        } else {
            if(email === user.email) {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(isMatch) {
                        res.status(200).json({ success: true, email: user.email, username: user.username })
                    } else {
                        res.status(400).json({ success: false, msg: 'Invalid Credentials'})
                    }
                })
            } else {
                res.status(400).json({ success: false, msg: 'Invalid Credentials' })
            }
        }
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})