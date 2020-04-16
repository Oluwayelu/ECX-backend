const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = require('../../middleware/auth')
const User = require('../../models/User')
const { emailValidator, passwordValidator } = require('../../validator')

const dateTime = require('../../utils/dateTime')
const jwtSecret = require('../../config/config').jwtSecret

// @route   POST /signup
// @desc    Register user
// @access  Public
router.post('/signup', (req, res) => {
    const { email, username, names, occupation, password } = req.body

    if(emailValidator(email) && passwordValidator(password)){
        const newUser = new User({
            email,
            username, 
            names: names.split(" "),
            occupation,
            password,
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
                         
                        const updateUser = {
                            lastLogin: new Date()
                        }
                        User.findOneAndUpdate(
                            { email: user.email }, 
                            updateUser, 
                            { new: true})
                            .then(user => {
                                res.status(200).json({
                                    success: true,
                                    token: "Bearer " + token,
                                    msg: "User logged in"
                                })
                            })
                            .catch(() => res.status(400).json({ success: false, msg: 'Could not update user'}))
                            }
                        )
            })
        })
        .catch(() => res.status(400).json({ success: false, msg: 'Invalid credentials' }))
})

// @route   GET /getusers
// @desc    Get  all Users detail
// @access  Public
router.get('/getusers', (req, res) => {
    
    User.find({}, { password: 0 })
        .then(users => {
            if(!users) return res.status(400).json({ success: false, msg: 'No user' })
            
            res.status(200).json({ success: true, users })
        })
        .catch(() => res.status(400).json({ success: false, msg: 'Could not find users' }))
})


// @route   GET /getuser/:id
// @desc    Get User details
// @access  Private
router.get('/getuser/:id', auth, (req, res) => {
    const { id } = req.params
    
    User.findOne({ _id: id }, { password: 0 })
        .then(user => {
            if(req.user.email !== user.email) return res.status(400).json({ success: false, msg: 'user is not authorized' })
            res.status(200).json({
                _id: user._id,
                email: user.email,
                names: user.names,
                occupation: user.occupation,
                lastLogin: dateTime(user.lastLogin)
             })
        })
        .catch(() => res.status(400).json({ success: false, msg: 'User does not exist' }))
})

// @route   PUT /updateuser/:id
// @desc    Update User details(only authorized user can update account)
// @access  Private
router.put('/updateuser/:id', auth, (req, res) => {
    const { id } = req.params
    
    User.findOne({ _id: id })
        .then(user => {
            if(user.email !== req.user.email) return res.status(400).json({ success: false, msg: 'user is not authorized' })

            User.findOneAndUpdate(
                { _id: id }, 
                req.body, 
                { new: true})
                .then(user => {
                    res.status(200).json({ success: true, msg: 'User updated' })
                })
                .catch(() => res.status(400).json({ success: false, msg: 'Could not update user'}))
        })
        .catch(() => res.status(400).json({ success: false, msg: 'Invalid credentials' }))
    
})

// @route   DELETE /deleteuser/:id
// @desc    Delete User details(only authorized user can delete account)
// @access  Private
router.delete('/deleteuser/:id', auth, (req, res) => {
    const { id } = req.params

    User.findOneAndDelete({ _id: id })
        .then(user => {
            if(user.email !== req.user.email) return res.status(400).json({ success: false, msg: 'user is not authorized' })

            res.status(200).json({ success: true, msg: 'user account has been deleted' })
        })
        .catch(() => res.status(400).json({ success: false, msg: 'Could not delete user'}))
})

module.exports = router