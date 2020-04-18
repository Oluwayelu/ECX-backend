const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { emailValidator, passwordValidator } = require('../validator')

const dateTime = require('../utils/dateTime')
const jwtSecret = require('../config/config').jwtSecret

exports.signup = (req, res) => {
    const {  name, email, phoneNumber, amount, password, transactionPin } = req.body

    if(emailValidator(email) && passwordValidator(password)){
        const newUser = new User({
            name,
            email,
            phoneNumber,
            amount,
            password,
            transactionPin
        })
    
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err
                newUser.password = hash

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.transactionPin, salt, (err, hashPin) => {
                        if(err) throw err
                        newUser.transactionPin = hashPin

                        newUser.save()
                            .then(() => res.status(200).json({ success: true, msg: "User registered" }))
                            .catch(err => res.status(400).json({ success: false, msg: err.message }))
                    })
                })
            })
        })
    } else {
        res.status(400).json({ success: false, msg: "Invalid credentials" })
    }
}

exports.login = (req, res) => {
    const { email, password } = req.body

    User.findOne({ email })
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
                    })
            })
        })
        .catch(() => res.status(400).json({ success: false, msg: 'Invalid credentials' }))
}

exports.getUsers = (req, res) => {
    
    User.find({}, { password: 0, transactionPin: 0 })
        .then(users => {
            if(!users) return res.status(400).json({ success: false, msg: 'No user' })
            
            res.status(200).json({ success: true, users })
        })
        .catch(() => res.status(400).json({ success: false, msg: 'Could not find users' }))
}

exports.getUser = (req, res) => {
    const { id } = req.params
    
    User.findById(id, { password: 0, transactionPin: 0 })
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

exports.transferFunds = (req, res) => {
    const { phoneNumber, amount, transactionPin }  = req.body
    const { id } = req.params

    User.findById(id, { password: 0 })
        .then(debitor => {
            if(req.user.email !== debitor.email) return res.status(400).json({ success: false, msg: 'user is not authorized' })

            bcrypt.compare(transactionPin, debitor.transactionPin, (err, isMatch) => {
                if(!isMatch) return res.status(400).json({ success: false, msg: 'Invalid transaction pin' })

                if(debitor.amount < amount) return res.status(400).json({ success: false, msg: 'Insufficient funds' })

                User.findOne({ phoneNumber }, { password: 0, transactionPin: 0 })
                    .then(creditor => {
                        if(!creditor) return res.status(400).json({ success: false, msg: 'User does not exist'})

                        User.findOneAndUpdate(
                            { phoneNumber },
                            { amount: creditor.amount + amount },
                            {new: true}
                            )
                            .then(creditor => {
                                creditor.transactionLogs.unshift({
                                    status: 'Credit',
                                    sendersPhoneNumber: debitor.phoneNumber,
                                    receiversPhoneNumber: creditor.phoneNumber,
                                    amount: amount,
                                    date: dateTime(new Date()).date,
                                    time: dateTime(new Date()).time
                                })
                                creditor.save()
                                User.findOneAndUpdate(
                                    { _id: id },
                                    { amount: debitor.amount - amount},
                                    { new: true }
                                    )
                                    .then(() => {
                                        User.findById(id, { password: 0, transactionPin: 0 })
                                            .then(debitor => {

                                                debitor.transactionLogs.unshift({
                                                    status: 'Debit',
                                                    sendersPhoneNumber: debitor.phoneNumber,
                                                    receiversPhoneNumber:creditor.phoneNumber,
                                                    amount: amount,
                                                    date: dateTime(new Date()).date,
                                                    time: dateTime(new Date()).time
                                                })

                                                debitor.save()
                                                    .then(() => res.status(200).json({ success: true, msg: 'Transaction successful' }))
                                                    .catch(() => res.status(400).json({ success: false, msg: 'Failed logging debitors transaction' }))
                                            })
                                    })
                            })
                    })
            })
        })
        .catch(err => res.status(400).json({ success: false, msg: 'Transaction failed', err }))
}

exports.getUserTransactions = (req, res) => {
    const { id } = req.params

    User.findById(id)
        .then(user => {
            if(req.user.email !== user.email) return res.status(400).json({ success: false, msg: 'user is not authorized' })

            res.status(200).json({ success: true, transactions: user.transactionLogs })
        })
       .catch(() => res.status(400).json({ success: false, msg: 'Transactions not found' }))
}