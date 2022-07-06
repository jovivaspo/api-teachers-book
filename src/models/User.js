const {Schema, models, model} = require('mongoose')
const bcrypt = require("bcryptjs") ;

const userSchema = new Schema({
    name:{
        type: String,
        required: [true,"Nombre requerido"],
    },
    email:{
        type:String,
        required:[true,"Email requerido"],
        unique: true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,"Contraseña requerida"],
    },
    verified:{
        type:String,
        default:"Not verified"
    },
    school:{
        required:false,
        name:{
            type:String
        },
        cp:{
            type:String
        },
        location:{
            type:String
        },
        tel:{
            type:String
        },
        cc:{
            type:String
        },
        email:{
            type:String
        },
        web:{
            type:String
        }
    },
    notes:[{type:Schema.Types.ObjectId,ref:'Note'}]
},{
    timestamps:true,
    versionKey:false
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.set('toJSON',{
    transform:(document, returnObject) =>{
        delete returnObject.__v
        delete returnObject.password
    }
})

module.exports =  models.User || model("User",userSchema)