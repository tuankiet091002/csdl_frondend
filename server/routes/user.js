const express = require('express')
const router = express.Router()
const authorizePermissions = require('../middlewares/authorization')

const {
	getUsers,
	getSingleUser,
	updateUserInfo,
	showCurrentUser,
	deleteUser
} = require('../controllers/user.js')

router.route('/showMe').get(showCurrentUser)
router.route('/').get(getUsers)
router.route('/:userID').get(getSingleUser).patch(updateUserInfo).delete(authorizePermissions('admin'), deleteUser)

module.exports = router