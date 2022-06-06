const {Router} = require('express')
const noteController = require('../controllers/noteController')
const verifyTokenUser = require('../middleware/verifyTokenUser')

const router = Router()

router.get("/:id_user", verifyTokenUser, noteController.getAllNotes)
router.post("/:id_user", verifyTokenUser, noteController.createNote)
router.get("/:id_user/:id_note", verifyTokenUser, noteController.getNote)
router.delete("/:id_user/:id_note", verifyTokenUser, noteController.deleteNote)
router.delete("/:id_user/", verifyTokenUser, noteController.deleteAllNotes)

module.exports = router