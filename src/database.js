const mongoose = require('mongoose')

mongoose.connect(process.env.URI_MONGO)

mongoose.connection.on('connected',()=>{
    console.log("DB connected")
})

mongoose.connection.on('error',(error)=>{
    console.log(error)
})

