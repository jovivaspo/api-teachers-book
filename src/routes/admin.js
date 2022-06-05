const {Router} = require('express')
const userController  = require('../controllers/userController')
const adminController = require('../controllers/adminController')
const verifyToken = require('../middleware/verifyToken')

const router = Router()
router.post('/login', adminController.login)
router.get('/users', verifyToken , userController.getAllUsers)
router.delete('/users', userController.deleteAllUsers)
router.post('/user', userController.createUser)
router.delete('/user/:id', userController.deleteUser)
router.put('/user/:id', userController.updateUser)

module.exports = router