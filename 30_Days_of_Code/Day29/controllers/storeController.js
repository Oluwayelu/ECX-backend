const Store = require('../models/Store')
const User = require('../models/User')

exports.createStore = (req, res) => {
    const { id, email } = req.user

    User.findOne({ email: req.user.email })
        .then(user => {
            if(user.userType !== 'Admin') return res.status(400).json({ success: false, msg: 'User is not an admin' })

            const newStore = new Store(req.body)
            newStore.userId = id

            newStore.save()
                .then(store => res.status(200).json({ success: true, msg: 'Store Created', store })) 
                .catch(() => res.status(400).json({ success: false, msg: 'Store could not be created'}))
        })
        .catch(() => res.status(400).json({ success: false, msg: 'User does not exist' }))
}

exports.getStore = (req, res) => {
    const { id } = req.params
    const { email } = req.user
    
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ success: false, msg: 'User not found '})

            Store.findById(id)
                .then(store => {
                    if(!store) return res.status(400).json({ success: false, msg: 'Store does not exist' })

                    res.status(200).json({ success: true, store })
                })
                .catch(() => res.status(400).json({ success: false, msg: 'User does not exist' }))
        })
}

exports.getAllStore = (req, res) => {
  
    Store.find()
        .populate('userId')
        .then(store => {
            if(!store) return res.status(400).json({ success: false, msg: 'There are no stores for this user' })

            res.status(200).json(store)
        })
        .catch(() => res.status(400).json({ success: false, msg: 'User does not exist' }))
        
}

exports.updateStore = (req, res) => {
    const { id } = req.params
    const { email } = req.user
    
    User.findOne({ email })
        .then(user => {
            if(user.userType !== 'Admin') return res.status(400).json({ success: false, msg: 'User is not an admin' })

            Store.findOneAndUpdate(
                { _id: id }, 
                req.body, 
                { new: true})
                .then(store => {
                    if(!Store) return res.status(400).json({ success: false, msg: 'store does not exist' })
        
                    res.status(200).json({ success: true, msg: 'Store updated' })
                })
                .catch(() => res.status(400).json({ success: false, msg: 'Could not update store'}))
        })
}

exports.deleteStore = (req, res) => {
    const { id } = req.params
    const { email } = req.user
    
    User.findOne({ email })
        .then(user => {
            if(user.userType !== 'Admin') return res.status(400).json({ success: false, msg: 'User is not an admin' })

            Store.findOneAndDelete({ _id: id })
            .then(store => {
                if(!store) return res.status(400).json({ success: false, msg: 'store does not exist' })
    
                res.status(200).json({ success: true, msg: 'store has been deleted' })
            })
            .catch(() => res.status(400).json({ success: false, msg: 'Could not delete store'}))
        })

    
}