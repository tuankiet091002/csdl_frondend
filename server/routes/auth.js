const express = require('express')
const router = express.Router()
const { register, login, logout } = require('../controllers/auth')
const rateLimiter = require('express-rate-limit')
const authorizePermissions = require('../middlewares/authorization')
const authenticateUser = require('../middlewares/authentication')

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: 'Too many requests from this IP, please try again after 15 minutes',
  },
});

router.post('/register' , authenticateUser, apiLimiter ,authorizePermissions('admin') ,register)
router.post('/login', login)
router.get('/logout', logout)
module.exports = router