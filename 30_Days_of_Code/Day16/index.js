const express = require('express')
const bcrypt = require('bcrypt')

const { emailValidator, passwordValidator } = require('./validator')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//database
let user 

// @route   POST /signup
// @desc    Register user
// @access  Public
app.post('/signup', (req, res) => {
    const { email, username, password } = req.body

    (!emailValidator(email)) ?
        res.status(400).json({ success: false, msg: 'Invalid email'})  
    :
        (!passwordValidator(password)) ?
            res.status(400).json({ success: false, msg: 'Password should be at least 6 charcters long' })
        :
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
})

// @route   GET /login
// @desc    Login User
// @access  Public
app.post('/login', (req, res) => {
    const { email, password } = req.body

    (!emailValidator(email) || !passwordValidator(password)) ?
        res.status(400).json({ success: false, msg: 'Invalid Credentials'})  
    : 
        (email !== user.email) ?
            res.status(400).json({ success: false, msg: 'Email does not exist' })
        :
            bcrypt.compare(password, user.password, (err, isMatch) => {
                (isMatch) ?
                    res.status(200).json({ success: true, msg: 'Login Successful' })
                :
                    res.status(400).json({ success: false, msg: 'Incorrect password' })
            })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})