const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const auth = require('../../middleware/auth')
const User = require('../../models/User')
const { emailValidator, passwordValidator } = require('../../validator')

const jwtSecret = require('../../config/config').jwtSecret

// @route   POST /signup
// @desc    Register user
// @access  Public
router.post('/signup', (req, res) => {
    const { email, username, password } = req.body
    const dateTime = new Date()

    let date = `${dateTime.getDate()}-${dateTime.getMonth() + 1}-${dateTime.getFullYear()}`
    let time = dateTime.getHours() > 12 ? 
        `${dateTime.getHours() - 12}:${dateTime.getMinutes()}pm` : 
        `${dateTime.getHours()}:${dateTime.getMinutes()}am`

    if(emailValidator(email) && passwordValidator(password)){
        const newUser = new User({
            email,
            username, 
            password,
            date,
            time
        })
    
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err
                newUser.password = hash
                newUser.save()
                    .then(() => res.status(200).json({ success: true, msg: "User registered" }))
                    .catch(err => res.status(400).json({ success: false, msg: "Email/Username already exists" }))
            })
        })
    } else {
        res.status(400).json({ success: false, msg: "Invalid credentials" })
    }
})

// @route   POST /login
// @desc    Login User
// @access  Public
router.post('/login', (req, res) => {
    const { email, username, password } = req.body

    let conditions = username ? {username: username } : { email: email }

    User.findOne(conditions)
        .then(user => {
            if(!user) return res.status(400).json({ success: false, msg: 'Invalid credentials' })
            
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
        })
        .catch(() => res.status(400).json({ success: false, msg: 'Invalid credentials' }))
})

// @route   GET /getuser
// @desc    Get User details
// @access  Private
router.get('/getuser', auth, (req, res) => {
    const { email, username } = req.body
    let conditions = username ? {username: username } : { email: email }
    
    User.findOne(conditions)
        .then(user => {
            if(req.user.email !== user.email) return res.status(400).json({ success: false, msg: 'Invalid credentials' })
            res.status(200).json({ 
                _id: user._id,
                email: user.email, 
                username: user.username, 
                date: user.date, 
                time: user.time
            })
        })
})

module.exports = router