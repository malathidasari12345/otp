const express = require('express')
const { register, VerfiyEmail } = require('../controllers/Auth')
const router = express.Router()


router.post('/register', register) 
router.post('/verifyEmail',VerfiyEmail)

module.exports = router