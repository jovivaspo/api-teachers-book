const Admin = require('../models/Admin')


const createAdmin = async (config) => {
    try{
       
        const admin = await Admin.findOne({email:config.EMAIL})

        if(!admin){
          const admin =   new Admin({
              email:config.EMAIL,
              password: config.PASSWORD
          })

    
          admin.password = await admin.encryptPassword(admin.password)
          await admin.save()
          console.log("Administrador creado")
    
        }else{
            console.log("Existe un administrador")
        }

    }catch(error){
        console.log(error)
    }
   
}

module.exports = createAdmin