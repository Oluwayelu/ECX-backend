const router = require('express').Router()

const storeController = require('../../controllers/storeController')
const auth = require('../../middleware/auth')

// @route   POST /createStore
// @desc    create store
// @access  Private
router.post('/createStore', auth,  storeController.createStore)

// @route   GET /getStore/:id
// @desc    get a particular store
// @access  Private
router.get('/getStore/:id', auth, storeController.getStore)

// @route   GET /getAllStore
// @desc    Get all stores
// @access  Public
router.get('/getAllStore', storeController.getAllStore)

// @route   PUT /updateStore/:id
// @desc    Update Store details(only admin can update store)
// @access  Private
router.put('/updateStore/:id', auth, storeController.updateStore)

// @route   DELETE /deleteStore/:id
// @desc    Delete Store details(only admin can delete store)
// @access  Private
router.delete('/deleteStore/:id', auth, storeController.deleteStore)

module.exports = router