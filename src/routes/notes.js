const {Router} = require('express')
const noteController = require('../controllers/noteController')
const verifyTokenUser = require('../middleware/verifyTokenUser')

const router = Router()

router.get("/:id_user", verifyTokenUser, noteController.getAllNotes)
router.delete("/:id_user/", verifyTokenUser, noteController.deleteAllNotes)
router.post("/:id_user", verifyTokenUser, noteController.createNote)
router.get("/:id_user/:id_note", verifyTokenUser, noteController.getNote)
router.delete("/:id_user/:id_note", verifyTokenUser, noteController.deleteNote)
router.put("/:id_user/:id_note", verifyTokenUser, noteController.updateNote)

module.exports = router