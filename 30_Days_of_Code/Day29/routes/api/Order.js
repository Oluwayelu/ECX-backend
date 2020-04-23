const router = require('express').Router()

const orderController = require('../../controllers/orderController')
const auth = require('../../middleware/auth')

// @route   POST /createOrder
// @desc    create product
// @access  Private
router.post('/createOrder/:productId', auth,  orderController.createOrder)

// @route   GET /getOrder/:id
// @desc    get a particular product
// @access  Private
router.get('/getOrder/:id', auth, orderController.getOrder)

// @route   GET /getAllOrder
// @desc    Get all products
// @access  Public
router.get('/getAllOrder', orderController.getAllOrders)

// @route   PUT /updateOrder/:id
// @desc    Update product detail(only admin can update product)
// @access  Private
router.put('/updateOrder/:id', auth, orderController.updateOrder)

// @route   DELETE /deleteOrder/:id
// @desc    Delete Order detail(only admin can delete product)
// @access  Private
router.delete('/deleteOrder/:id', auth, orderController.deleteOrder)

module.exports = router