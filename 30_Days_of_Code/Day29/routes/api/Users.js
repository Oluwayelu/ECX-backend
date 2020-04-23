const router = require('express').Router()

const userController = require('../../controllers/userController')
const auth = require('../../middleware/auth')

// @route   POST /signup
// @desc    Register user
// @access  Public
router.post('/createUser', userController.createUser)

// @route   POST /login
// @desc    Login User
// @access  Public
router.post('/loginUser', userController.loginUser)

// @route   GET /getuser/:id
// @desc    Get User details
// @access  Private
router.get('/getUser/:id', auth, userController.getUserId)

// @route   PUT /updateuser/:id
// @desc    Update User details(only authorized user can update account)
// @access  Private
router.put('/updateUser/:id', auth, userController.updateUser)

// @route   DELETE /deleteuser/:id
// @desc    Delete User details(only authorized user can delete account)
// @access  Private
router.delete('/deleteuser/:id', auth, userController.deleteUser)

module.exports = router