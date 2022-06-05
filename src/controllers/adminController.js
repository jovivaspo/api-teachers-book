const Admin = require("../models/Admin")
const jwt = require("jsonwebtoken")
const config = require('../config')

const adminController = {}

 adminController.login = async (req,res,next) => {
     try{
        const {email,password} = req.body
        const admin = await Admin.findOne({email})
        if(!admin){
            res.status(401)
            const error = new Error("Correo incorrecto")
            next(error)
        }else{
            const match = await admin.matchPassword(password)
            if(!match){
                res.status(401)
                const error = new Error("La contraseña no es correcta")
                return next(error)
            }
            const {id} = admin._id
            const  token = jwt.sign({id,email},config.KEY,{
                expiresIn: 86400,
            })
            return res.status(200).json({token})
        }

     }catch(error){
         console.log(error)
         next(error)
     }
   
 }

 module.exports = adminController