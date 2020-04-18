const router = require('express').Router()
const bcrypt = require('bcryptjs')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const userController = require('../../controllers/User')
const logController = require('../../controllers/Logs')
const auth = require('../../middleware/auth')



// @route   POST /signup
// @desc    Register user
// @access  Public
router.post('/signup', userController.signup)

// @route   POST /login
// @desc    Login User
// @access  Public
router.post('/login', userController.login)

// @route   GET /getusers
// @desc    Get  all Users detail
// @access  Public
router.get('/getUsers', userController.getUsers)

// @route   GET /getuser/:id
// @desc    Get User details
// @access  Private
router.get('/getUser/:id', auth, userController.getUser)

// @route   PUT /updateuser/:id
// @desc    Update User details(only authorized user can update account)
// @access  Private
router.put('/updateUser/:id', auth, userController.updateUser)

// @route   DELETE /deleteuser/:id
// @desc    Delete User details(only authorized user can delete account)
// @access  Private
router.delete('/deleteuser/:id', auth, userController.deleteUser)

// @route   GET /logs
// @desc    Get logs of request made to the server
// @access  Public
router.get('/logs', logController.log)

// @route   GET /transferFunds
// @desc    Get logs of request made to the server
// @access  Private
router.post('/transferFunds/:id', auth, userController.transferFunds)

// @route   GET /getUserTransactions
// @desc    Get user transactions
// @access  Private
router.get('/getUserTransactions/:id', auth, userController.getUserTransactions)

module.exports = router