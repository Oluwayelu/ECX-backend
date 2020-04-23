const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/keys').secretKey

function auth(req, res, next){
    //Check for Authorization header
    if(!req.header('Authorization')) return res.status(401).json({ success: false, msg: 'No Authorization header'})

    const header = req.header('Authorization').split(" ")

    if( header.length !== 2) return res.status(401).json({ success: false, msg: 'Token does not exists'})

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