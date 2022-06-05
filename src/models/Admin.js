const { Schema, models, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const adminSchema = new Schema ({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    versionKey:false
})

adminSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

adminSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

module.exports = models.Admin || model('Admin', adminSchema)