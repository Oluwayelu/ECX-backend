const router = require('express').Router()

const cartController = require('../../controllers/cartController')
const auth = require('../../middleware/auth')

// @route   POST /createCart
// @desc    create product
// @access  Private
router.post('/createCart', auth,  cartController.createCart)

// @route   GET /getCart/:id
// @desc    get a particular product
// @access  Private
router.get('/getCart/:id', auth, cartController.getCart)

// @route   PUT /updateCart/:id
// @desc    Update product detail(only admin can update product)
// @access  Private
router.put('/updateCart/:id', auth, cartController.updateCart)

// @route   DELETE /deleteCart/:id
// @desc    Delete product detail(only admin can delete product)
// @access  Private
router.delete('/deleteCart/:id', auth, cartController.deleteCart)

module.exports = router