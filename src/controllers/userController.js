const User = require('../models/User')
const Note = require('../models/Note')
const createToken = require('../services/createToken')
const sendEmail = require('../services/sendEmail')
const jwt = require('jsonwebtoken')
const config = require('../config')

const userController = {}

userController.login = async (req, res, next) => {
    try {

        const { email, password } = req.body
        console.log("Login: ", email)
        const user = await User.findOne({ email })
        if (!user) {
            const error = new Error("Email no registrado")
            console.log("Email no registrado")
            res.status(404)
            return next(error)
        }

        const match = await user.matchPassword(password)


        if (!match) {
            const error = new Error("Contraseña incorrecta")
            console.log("Contraseña incorrecta")
            res.status(401)
            return next(error)
        }


        if (user.verified === "Not verified") {
            res.status(401)
            const error = new Error("Debe confirmar su cuenta, mire su correo")
            console.log("Debe confirmar su cuenta, mire su correo")
            return next(error)
        }

        const token = createToken(user._id, email)

        return res.status(200).json({
            message: "Ha iniciado sesión",
            token
        })


    } catch (error) {
        next(error)
    }
}

userController.register = async (req, res, next) => {
    try {
        const body = req.body
        const userToCreated = await User.find({ "email": body.email })

        if (userToCreated.length > 0) {
            const error = new Error("Email en uso")
            res.status(401)
            return next(error)

        }
        const user = new User(body)
        const newPassword = await user.encryptPassword(body.password)
        user.password = newPassword
        const userSaved = await user.save()

        const token = createToken(userSaved._id, userSaved.email)

        await sendEmail(userSaved.email, token)

        return res.status(201).json({
            message: "Ha sido registrado, mire su correo para continuar ",
            user: userSaved,
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}


userController.confirm = async (req, res, next) => {
    try {
        const token = req.params.token

        const decodedToken = jwt.verify(token, config.KEY)

        if (!token || !decodedToken.id) {
            res.status(401)
            const error = new Error("Token invalido")
            return next(error)
        }

        const user = await User.findOne({ email: decodedToken.email })

        if (!user) {
            const error = new Error("Este correo es inválido")
            res.status(401)
            return next(error)
        }

        user.verified = "Verified"

        const userSaved = await user.save()

        const newToken = createToken(userSaved._id, userSaved.email)

        return res.status(200).json({
            token: newToken,
            user: userSaved
        })

    } catch (error) {
        console.log(error)
        res.status(401)
        next(error)
    }
}

userController.resendEmail = async (req, res, next) => {

    try {

        const email = req.body.email

        const user = await User.findOne({ email })

        if (!user) {
            const error = new Error("Email no registrado")
            res.status(401)
            return next(error)
        }

        const token = createToken(user._id, email)

        await sendEmail(email, token)

        return res.status(200).json({
            message: "Correo de confirmación reenviado",
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}




userController.getUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if (!user) {
            const error = new Error("Este usuario no existe")
            res.status(404)
            return next(error)
        }
        return res.status(200).json({ user })
    } catch (error) {

        next(error)
    }
}


userController.getAllUsers = async (req, res, next) => {
    try {
        //console.log(req.connection.remoteAddress)
        const users = await User.find()
        //if (users.length === 0) return res.status(200).json({ message: "No hay usuarios" })
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
            message: "Todos los usuarios fueron borrados"
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
            return next(error)

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
            await Note.deleteMany({ "_id_user": id })
            return res.status(202).json({
                message: "Usuario eliminado",
                id
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
        const userUpdated = await User.findByIdAndUpdate(id, body)
        return res.status(202).json({
            message: "Usuario actualizado",
            userUpdated
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}




module.exports = userController