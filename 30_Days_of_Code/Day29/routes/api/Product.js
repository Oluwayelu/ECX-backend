const router = require('express').Router()

const productController = require('../../controllers/productController')
const auth = require('../../middleware/auth')

// @route   POST /createProduct
// @desc    create product
// @access  Private
router.post('/createProduct', auth,  productController.createProduct)

// @route   GET /getProduct/:id
// @desc    get a particular product
// @access  Private
router.get('/getProduct/:id', auth, productController.getProduct)

// @route   GET /getAllProducts
// @desc    Get all products
// @access  Public
router.get('/getAllProducts', productController.getAllProducts)

// @route   PUT /updateProduct/:id
// @desc    Update product detail(only admin can update product)
// @access  Private
router.put('/updateProduct/:id', auth, productController.updateProduct)

// @route   DELETE /deleteProduct/:id
// @desc    Delete product detail(only admin can delete product)
// @access  Private
router.delete('/deleteProduct/:id', auth, productController.deleteProduct)

module.exports = router