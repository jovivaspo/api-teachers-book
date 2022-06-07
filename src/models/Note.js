const { Schema, models, model } = require('mongoose')
const noteSchema = new Schema({
    type: {
        type: String,
        required: [true, "Tipo de nota es requerido"]
    },
    title:{
        type: String,
        required:true,
        trim:true
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required:true
    },
    description: {
        type: String,
        required: true,
        trim:true
    }
}, {
    timestamps: true,
    versionKey: false
}
)

module.exports =  models.Note || model("Note", noteSchema)