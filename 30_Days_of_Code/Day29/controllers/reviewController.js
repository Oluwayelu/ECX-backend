const User = require('../models/User')
const Review = require('../models/Review')

exports.createReview = (req, res) => {
    const { id, email } = req.user

    User.findOne({ email })
        .then(user => {
            if(user.userType !== 'User') return res.status(400).json({ success: false, msg: 'Admin cannot create cart' })

            const newReview = new Review(req.body)
            if(newReview.rating > 5 || newReview.rating < 0) return res.status(400).json({ success: false, msg: 'Invalid Rating' })

            newReview.customer = {
                userId: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                phone: user.phone,
                email: user.email
            }

            newReview.save()
                .then(() => res.status(200).json({ success: true, msg: 'Review created', }))
                .catch(err => res.status(400).json({ success: false, msg: 'Review could not be created', err}))
        })
        .catch(() => res.status(400).json({ success: false, msg: 'User does not exist' }))
}

exports.getAllReviews = (req, res) => {
  
    Review.find()
        .then(reviews => {
            if(!reviews) return res.status(400).json({ success: false, msg: 'There are no reviews' })

            res.status(200).json({ success: true, reviews })
        })
        .catch(() => res.status(400).json({ success: false, msg: 'Review does not exist' }))       
}

exports.getReview  = (req, res) => {
    const { id } = req.params
    const { email } = req.user
    
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ success: false, msg: 'User not found '})

            Review.findById(id)
                .then(review => {
                    if(!review) return res.status(400).json({ success: false, msg: 'Review does not exist' })

                    res.status(200).json({ success: true, review })
                })
                .catch(() => res.status(400).json({ success: false, msg: 'Review could not be created' }))
        })
}

exports.updateReview  = (req, res) => {
    const { id } = req.params
    const { email } = req.user
    
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ success: false, msg: 'User not found' })

            Review.findOneAndUpdate(
                { _id: id }, 
                req.body, 
                { new: true})
                .then(review => {
                    if(!review) return res.status(400).json({ success: false, msg: 'Review does not exist' })
        
                    res.status(200).json({ success: true, msg: 'review updated' })
                })
                .catch(() => res.status(400).json({ success: false, msg: 'Could not update review'}))
        })
}

exports.deleteReview  = (req, res) => {
    const { id } = req.params
    const { email } = req.user
    
    User.findOne({ email })
        .then(user => {
            if(user.userType !== 'Admin') return res.status(400).json({ success: false, msg: 'User is not an admin' })

        Review.findOneAndDelete({ _id: id })
            .then(review => {
                if(!review) return res.status(400).json({ success: false, msg: 'Review does not exist' })
    
                res.status(200).json({ success: true, msg: 'Review has been deleted' })
            })
            .catch(() => res.status(400).json({ success: false, msg: 'Could not delete review'}))
        })   
}