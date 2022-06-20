const jwt = require('jsonwebtoken')
const config = require('../config')
const Admin = require('../models/Admin')

const verifyTokenAdmin = async ( req, res, next) => {
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
            const error = new Error("Token expirado")
            return next(error)
        }

        //console.log(decodedToken)
    
        const admin = await Admin.findOne({email:decodedToken.email})
    
       
        if(!admin){
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

module.exports = verifyTokenAdmin