const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/User')

const verifyTokenUser = async ( req, res, next) => {
    try{
        const authorization = req.get('Authorization')
        let token = ""
        if(authorization && authorization.toLowerCase().startsWith("bearer")){
            token = authorization.substring(7)
        }
        const decodedToken = jwt.verify(token,config.KEY)
       
        if(!token || !decodedToken.id){
            res.status(401)
            const error = new Error("Token invalido")
           return next(error)
        }

        if(Date.now() >= decodedToken.exp * 1000){
            res.status(401)
            const error = new Error("Token experado")
            return next(error)
        }
    
        const user = await User.findOne({email:decodedToken.email})
        
        if(!user){
            res.status(401)
            const error = new Error("Permiso denegado")
           return next(error)
        }
        
        console.log("Token valido")
        next()
        
    }catch(error){
        res.status(401)
        return next(error)
    }
  
}

module.exports = verifyTokenUser