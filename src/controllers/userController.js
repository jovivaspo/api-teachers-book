const User = require('../models/User')
const userController = {}


userController.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        if (users.length === 0) return res.status(200).json({ message: "No hay usuarios" })
        return res.status(200).json(users)
    } catch (err) {
        const error = new Error(err.message)
        next(error)
    }
}

userController.deleteAllUsers = async (req, res, next) => {
    try {
       await User.deleteMany({})
       return res.status(202).json({
           message:"Todos los usuarios fueron borrados"
       })
    } catch (err) {
        const error = new Error(err.message)
        next(error)
    }
}

userController.createUser = async (req, res, next) => {
    try {
        const body = req.body
        const userToCreated = await User.find({ "email": body.email })

        if (userToCreated.length > 0) {
            const error = new Error("Email en uso")
            res.status(400)
            next(error)

        }
        const user = new User(body)
        const newPassword = await user.encryptPassword(body.password)
        user.password = newPassword
        const userSaved = await user.save()
        return res.status(201).json({
            message: "Usuario creado con éxito",
            user: userSaved
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

userController.deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if (!user) {
            const error = new Error('Este usuario no existe')
            res.status(404)
            next(error)
        } else {
            await User.findByIdAndDelete(id)
            return res.status(200).json({
                message:"Usuario eliminado"
            })
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
}

userController.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id 
        const body = req.body
        const userUpdated = await User.findByIdAndUpdate(id,body)
        return res.status(202).json({message:"Usuario actualizado"})
    } catch (err) {
        console.log(error)
        next(error)
    }
}




module.exports = userController