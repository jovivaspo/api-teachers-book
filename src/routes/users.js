const {Router} = require('express')
const userController = require("../controllers/userController")

const verifyTokenUser = require('../middleware/verifyTokenUser')

const router = Router()
router.post('/login', userController.login)
router.post('/register', userController.register)

router.get('/:id',verifyTokenUser,userController.getUser)
router.delete('/:id',verifyTokenUser, userController.deleteUser)
router.put('/:id',verifyTokenUser, userController.updateUser)

module.exports = router