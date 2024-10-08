const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UsersController')
const { authentication } = require('../middlewares/authentication')
const User = require('../models/User')

router.post('/', UserController.register)
router.post('/login', UserController.login)
router.delete ('/logout', authentication,UserController.logout)

module.exports = router