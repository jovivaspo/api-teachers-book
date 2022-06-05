const jwt = require('jsonwebtoken')
const config = require('../config')

const verifyToken = async ( req, res, next) => {
    const authorization = req.get('Authorization')
    let token = ""
    if(authorization && authorization.toLowerCase().startsWith("bearer")){
        token = authorization.substring(7)
    }
    const decodedToken = jwt.verify(token,config.KEY)
    console.log(decodedToken)
    if(!token || !decodedToken.id){
        res.status(401)
        const error = new Error("Token invalido")
       return next(error)
    }
    console.log("Token valido")
    next()
}

module.exports = verifyToken