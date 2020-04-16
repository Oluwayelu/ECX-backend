const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/config').jwtSecret

function auth(req, res, next){
    const header = req.header('Authorization').split(" ")

    //Check for bearer prefix
    if(header[0] !== "Bearer") return res.status(400).json({ success: false, msg: 'Token does not include Bearer prefix'})

    const token = header[1]
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