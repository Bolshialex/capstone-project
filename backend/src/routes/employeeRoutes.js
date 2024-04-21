const express = require('express')
const router = express.Router()
const {getEmployeeInfo, createEmployeeInfo} = require('../controllers/employeeController')

router.get('/', getEmployeeInfo)

router.post('/', createEmployeeInfo)

module.exports = router