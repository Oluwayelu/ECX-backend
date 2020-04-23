const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')

exports.createOrder = (req, res) => {
    const { productId } = req.params
    const { email } = req.user

    User.findOne({ email })
        .then(user => {
            if(user.userType !== 'User') return res.status(400).json({ success: false, msg: 'Admin cannot create order' })

            const newOrder = new Order(req.body)
            
            Product.findById(productId)
                .populate('storeId')
                .then(product => {
                    newOrder.referenceId =  product.storeId.name.slice(0, 3).toLowerCase() +  user.name.slice(0,3).toLowerCase() + Date.now()
                    newOrder.save()
                        .then(order => res.status(200).json({ success: true, msg: 'Order created', order }))
                        .catch(() => res.status(400).json({ success: false, msg: 'User does not exist' }))
                })
        })
        .catch(() => res.status(400).json({ success: false, msg: 'User does not exist' }))
}

exports.getOrder = (req, res) => {
    const { id } = req.params
    const { email } = req.user
    
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ success: false, msg: 'User not found '})

            Order.findById(id)
                .then(order => {
                    if(!order) return res.status(400).json({ success: false, msg: 'Order does not exist' })

                    res.status(200).json({ success: true, order })
                })
                .catch(() => res.status(400).json({ success: false, msg: 'Could not get order' }))
        })
}

exports.getAllOrders = (req, res) => {
  
    Order.find()
        .then(orders => {
            if(!orders) return res.status(400).json({ success: false, msg: 'There are no products' })

            res.status(200).json({ success: true, orders })
        })
        .catch(() => res.status(400).json({ success: false, msg: 'User does not exist' }))       
}

exports.updateOrder = (req, res) => {
    const { id } = req.params
    const { email } = req.user
    
    User.findOne({ email })
        .then(user => {
            if(user.userType !== 'User') return res.status(400).json({ success: false, msg: 'Admin cannot update order' })

            Order.findOneAndUpdate(
                { _id: id }, 
                req.body, 
                { new: true})
                .then(order => {
                    if(!order) return res.status(400).json({ success: false, msg: 'Cart does not exist' })
        
                    res.status(200).json({ success: true, msg: 'Order updated' })
                })
                .catch(() => res.status(400).json({ success: false, msg: 'Could not update order'}))
        })
}

exports.deleteOrder = (req, res) => {
    const { id } = req.params
    const { email } = req.user
    
    User.findOne({ email })
        .then(user => {
            if(user.userType !== 'User') return res.status(400).json({ success: false, msg: 'Admin cannot delete order' })

            Order.findOneAndDelete({ _id: id })
                .then(order => {
                    if(!order) return res.status(400).json({ success: false, msg: 'Order does not exist' })
        
                    res.status(200).json({ success: true, msg: 'Order has been deleted' })
                })
                .catch(() => res.status(400).json({ success: false, msg: 'Could not delete order'}))
        })   
} 