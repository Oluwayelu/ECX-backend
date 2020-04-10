/*
Day 17 of 30 Days of Code

Write a program to check from two given numbers, whether one is positive and another one is negative

Created on Fri Apr 10 7:36:27pm 2020

@author: Oluwayelu Ifeoluwa
*/

const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const auth = require('./middleware/auth')
const jwtSecret = require('./config/config').jwtSecret
const { emailValidator, passwordValidator } = require('./validator')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//user database
let userDB = []

// @route   POST /signup
// @desc    Register user
// @access  Public
app.post('/signup', (req, res) => {
    const { email, username, password } = req.body
    const dateTime = new Date()

    let date = `${dateTime.getDate()}-${dateTime.getMonth() + 1}-${dateTime.getFullYear()}`
    let time = dateTime.getHours() > 12 ? 
        `${dateTime.getHours() - 12}:${dateTime.getMinutes()}pm` : 
        `${dateTime.getHours()}:${dateTime.getMinutes()}am`

    if(emailValidator(email) && passwordValidator(password)){
        const newUser = {
            email,
            username, 
            password,
            date,
            time
        }
    
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err
                newUser.password = hash
                userDB.push(newUser)
                res.status(200).json({ success: true, msg: "User registered" })
            })
        })
    } else {
        res.status(400).json({ success: false, msg: "Invalid credentials" })
    }
})

// @route   POST /login
// @desc    Login User
// @access  Public
app.post('/login', (req, res) => {
    const { email, username, password } = req.body

    userDB.map(user => {
        if(user.email === email || user.username === username) {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(!isMatch) return res.status(400).json({ success: false, msg: 'Invalid credentials' })

                const payload = { email: user.email }
                jwt.sign(
                    payload,
                    jwtSecret,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if(err) return res.status(400).json({success: false, msg: 'Error occured while creating a token' })
                        res.status(200).json({
                            success: true,
                            token: "Bearer " + token,
                            msg: "User logged in"
                        })
                    }
                )
            })
        } else {
            res.status(400).json({ success: false, msg: 'Invalid credentials' })
        }
    })
})


// @route   GET /getuser
// @desc    Get User details
// @access  Private
app.get('/getuser', auth, (req, res) => {
    const { email } = req.body

    if(email !== req.user.email) return res.status(400).json({ success: false, msg: 'Email is not tokenized' })
    
    userDB.map(user => {
        if(req.user.email !== user.email) return res.status(400).json({ success: false, msg: 'tokenized email does not exist' })
        res.status(200).json({ email: user.email, date: user.date, time: user.time })
    })
    
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})