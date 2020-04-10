const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/config').jwtSecret

function auth(req, res, next){
    const token = req.header('Authorization').split(" ")[1]

    //Check for token
    if(!token) return res.status(401).json({ success: false, msg: 'No token, authorization denied' })

    try {
        //Verify token
        const decoded = jwt.verify(token, jwtSecret)
        //Add user from payload
        req.user = decoded
        next();
    } catch(e) {
        res.status(400).json({ success: false, msg: 'Token is not valid' })
    }
}

module.exports = auth