const router = require('express').Router()

const reviewController = require('../../controllers/reviewController')
const auth = require('../../middleware/auth')

// @route   POST /createProduct
// @desc    create product
// @access  Private
router.post('/createReview', auth,  reviewController.createReview)

// @route   GET /getProduct/:id
// @desc    get a particular product
// @access  Private
router.get('/getReview/:id', auth, reviewController.getReview)

// @route   GET /getAllProducts
// @desc    Get all products
// @access  Public
router.get('/getAllReview', reviewController.getAllReviews)

// @route   PUT /updateProduct/:id
// @desc    Update product detail(only admin can update product)
// @access  Private
router.put('/updateReview/:id', auth, reviewController.updateReview)

// @route   DELETE /deleteProduct/:id
// @desc    Delete product detail(only admin can delete product)
// @access  Private
router.delete('/deleteReview/:reviewId', auth, reviewController.deleteReview)

module.exports = router