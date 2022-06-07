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
router.get('/user/:id', verifyTokenAdmin, userController.getUser)
router.delete('/user/:id',verifyTokenAdmin, userController.deleteUser)
router.put('/user/:id',verifyTokenAdmin, userController.updateUser)


router.get('/notes', verifyTokenAdmin, noteController.getAll)
router.delete('/notes', verifyTokenAdmin, noteController.deleteAll)
router.get('/user/:id_user/notes', verifyTokenAdmin, noteController.getAllNotes)
router.delete('/user/:id_user/notes',verifyTokenAdmin,noteController.deleteAllNotes)
router.get('/note/:_id_note', verifyTokenAdmin, noteController.getNote)


module.exports = router