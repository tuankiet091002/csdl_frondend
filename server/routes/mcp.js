const express = require('express')
const router = express.Router()
const authorizePermissions = require('../middlewares/authorization')

const {
  getAllMCPs,
  createMCP,
  getMCP,
  deleteMCP,
  updateMCP,
} = require('../controllers/mcp')

router.route('/').get(getAllMCPs).post(authorizePermissions('admin' ,'backofficer') ,createMCP)
router.route('/:MCP_ID')
.get(getMCP)
.delete(authorizePermissions('admin' ,'backofficer') ,deleteMCP)
.patch(updateMCP)

module.exports = router