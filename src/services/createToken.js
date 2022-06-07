const jwt = require("jsonwebtoken")
const config = require('../config')

const createToken = (id,email)=>{
    const  token = jwt.sign({id,email},config.KEY,{
        expiresIn: 86400,  //1 día = 86400 seg
    })

    return token
}

module.exports = createToken