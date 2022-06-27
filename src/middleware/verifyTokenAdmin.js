const jwt = require('jsonwebtoken')
const config = require('../config')
const Admin = require('../models/Admin')

const verifyTokenAdmin = async (req, res, next) => {
    try {
        const authorization = req.get('Authorization')
        let token = ""
        if (authorization && authorization.toLowerCase().startsWith("bearer")) {
            token = authorization.substring(7)
        }
         jwt.verify(token, config.KEY, async (err, decodedToken) => {
            if (err) {
                res.status(401)
                const error = new Error(err)
                return next(error)
            }
            const admin = await Admin.findOne({ email: decodedToken.email })


            if (!admin) {
                res.status(401)
                const error = new Error("Permiso denegado")
                return next(error)
            }
    
            console.log("Token valido")
            next()
        })

      
    } catch (error) {
        console.log(error)
        res.status(401)
        return next(error)
    }

}

module.exports = verifyTokenAdmin