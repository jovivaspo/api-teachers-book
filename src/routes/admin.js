const {Router} = require('express')
const userController  = require('../controllers/userController')
const adminController = require('../controllers/adminController')
const noteController = require('../controllers/noteController')
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')

const router = Router()


router.post('/login', adminController.login)
router.get('/users', verifyTokenAdmin, userController.getAllUsers)
router.delete('/users',verifyTokenAdmin, userController.deleteAllUsers)
router.post('/user',verifyTokenAdmin, userController.createUser)
router.delete('/user/:id',verifyTokenAdmin, userController.deleteUser)
router.put('/user/:id',verifyTokenAdmin, userController.updateUser)
router.get('/notes', verifyTokenAdmin, noteController.getAll)

module.exports = router