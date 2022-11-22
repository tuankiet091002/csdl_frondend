const express = require('express')
const router = express.Router()


const {
  getUsers,
  getSingleUser,
  updateUserInfo,
  showCurrentUser
} = require('../controllers/user.js')

router.route('/showMe').get(showCurrentUser)
router.route('/').get(getUsers)
router.route('/:userID').get(getSingleUser).patch(updateUserInfo)

module.exports = router