const express = require('express')
const router = express.Router()
const authorizePermissions = require('../middlewares/authorization')
const {
  getAllTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
  getMyTasks
} = require('../controllers/tasks')


router.route('/')
.get(authorizePermissions('admin' ,'backofficer'), getAllTasks)
.post(authorizePermissions('admin' ,'backofficer'), createTask)

router.route('/myTasks').get(getMyTasks)
router.route('/:taskID')
.get(getTask)
.delete(authorizePermissions('admin' ,'backofficer') ,deleteTask)
.patch(updateTask)

module.exports = router