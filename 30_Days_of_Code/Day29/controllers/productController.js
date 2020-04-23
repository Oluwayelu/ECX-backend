const Store = require('../models/Store')
const User = require('../models/User')
const Product = require('../models/Product')

exports.createProduct = (req, res) => {
    const { storeId } = req.body
    const { email } = req.user

    User.findOne({ email })
        .then(user => {
            if(user.userType !== 'Admin') return res.status(400).json({ success: false, msg: 'User is not an admin' })

            Store.findOne({ storeId })
                .then(() => {

                    const newProduct = new Product(req.body)
                    newProduct.save()
                        .then(product => res.status(200).json({ success: true, msg: 'Product created', product }))
                        .catch(err => res.status(400).json({ success: false, msg: 'Product could not be created', err}))
                })
        })
        .catch(() => res.status(400).json({ success: false, msg: 'User does not exist' }))
}

exports.getProduct = (req, res) => {
    const { id } = req.params
    const { email } = req.user
    
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ success: false, msg: 'User not found '})

            Product.findById(id)
                .then(product => {
                    if(!product) return res.status(400).json({ success: false, msg: 'Product does not exist' })

                    res.status(200).json({ success: true, product })
                })
                .catch(() => res.status(400).json({ success: false, msg: 'User does not exist' }))
        })
}

exports.getAllProducts = (req, res) => {
  
    Product.find()
        .populate('storeId')
        .then(product => {
            if(!product) return res.status(400).json({ success: false, msg: 'There are no products for this user' })

            res.status(200).json(product)
        })
        .catch(() => res.status(400).json({ success: false, msg: 'User does not exist' }))       
}

exports.updateProduct = (req, res) => {
    const { id } = req.params
    const { email } = req.user
    
    User.findOne({ email })
        .then(user => {
            if(user.userType !== 'Admin') return res.status(400).json({ success: false, msg: 'User is not an admin' })

            Product.findOneAndUpdate(
                { _id: id }, 
                req.body, 
                { new: true})
                .then(product => {
                    if(!product) return res.status(400).json({ success: false, msg: 'Product does not exist' })
        
                    res.status(200).json({ success: true, msg: 'Product updated' })
                })
                .catch(() => res.status(400).json({ success: false, msg: 'Could not update product'}))
        })
}

exports.deleteProduct = (req, res) => {
    const { id } = req.params
    const { email } = req.user
    
    User.findOne({ email })
        .then(user => {
            if(user.userType !== 'Admin') return res.status(400).json({ success: false, msg: 'User is not an admin' })

            Product.findOneAndDelete({ _id: id })
            .then(product => {
                if(!product) return res.status(400).json({ success: false, msg: 'product does not exist' })
    
                res.status(200).json({ success: true, msg: 'product has been deleted' })
            })
            .catch(() => res.status(400).json({ success: false, msg: 'Could not delete product'}))
        })   
}