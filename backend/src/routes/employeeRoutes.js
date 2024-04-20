const express = require('express')
const router = express.Router()
const {getEmployeeInfo} = require('../controllers/employeeController')

router.get('/employee', getEmployeeInfo)

module.exports = router