const Note = require('../models/Note')
const { deleteMany } = require('../models/User')
const User = require('../models/User')

const noteController = {}

noteController.getAll = async (req, res, next) =>{
    try{
        const notes = await Note.find()
        res.status(200).json(notes)
    }catch(error){
        res.status(500)
        next(error)
    }
}

noteController.createNote = async (req, res, next) => {
    try {
        const id_user = req.params.id_user

        const user = await User.findById(id_user)

        const {type, name, description, date }= req.body

        const newNote = new Note({
            type,
            name,
            description,
            date,
            user: user._id
        })

        const noteSaved = await newNote.save()

        if(!noteSaved){
            const error = new Error("Error al crear la nota")
            return next(error)
        }


        user.notes = user.notes.concat(noteSaved._id)

        await user.save()

        return res.status(201).json({
            message: "Nueva nota creada con éxito",
            note: noteSaved
        })
    } catch (error) {
        res.status(500)
        next(error)
    }


}
noteController.getAllNotes = async (req, res, next) => {
    try {
        const id_user = req.params.id_user
        const notes = await Note.find({ "_id_user": id_user })
        if (notes.length === 0) return res.status(200).json({ message: "Ninguna nota creada" })
        return res.status(200).json(notes)
    } catch (error) {
        next(error)
    }
}
noteController.getNote = async (req, res, next) => {
    try {
        const id_note = req.params.id_note
        const note = await Note.findById(id_note)
        if(!note){
            const error = new Error("No se encontró la nota")
            res.status(404)
            return next(error)
        }
        return res.status(200).json(note)
    } catch (error) {
        next(error)
    }
}
noteController.updateNote = async (req, res, next) => {

}
noteController.deleteNote = async (req, res, next) => {
    try {
        const id_note = req.params.id_note
        const id_user = req.params.id_user

        const noteDeleted = await Note.findByIdAndDelete(id_note)

        if(!noteDeleted){
            const error = new Error("No se encontró la nota")
            res.status(404)
            return next(error)
        }

        const user = await User.findById(id_user)


        const newNotes = user.notes.filter(note => note.toString() !== id_note)

         user.notes = newNotes

         await user.save()

        return res.status(202).json({messaage:"Nota borrada"})

    } catch (error) {
        res.status(500)
        next(error)
    }
}


noteController.deleteAllNotes = async (req, res, next) => {
    try {
        
        const id_user = req.params.id_user

        const user = await User.findById(id_user)

        await Note.deleteMany({"_id_user":id_user})
        
        user.notes = []

        await user.save()

        return res.status(202).json({message:"Todas las notas fueron eliminadas"})


    } catch (error) {
        res.status(500)
        next(error)
    }
}


module.exports = noteController