
const transporter = require('../configEmail')

const sendEmail = async (userEmail,token) => {

    try {
        const email = await transporter.sendMail({
            from:"Jorge jorgevipo.dev@gmail.com",
            to: userEmail,
            subject:"Confirmación de cuenta",
            html:`
            <h1>BIENVENIDO A TEACHER'S BOOK</h1>
            <p>Por favor, ingrese en el siguiente enlace para confirmar su correo</p>
            <a href=http://localhost:8001/api/user/confirm/${token}>Confirmar Cuenta</a>
            `
        })

    } catch (error) {
        console.log(error)
    }

}

    module.exports = sendEmail




