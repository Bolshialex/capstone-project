const express = require('express')
const router = express.Router()
const {getCustomerInfo,} = require('../controllers/customerControllers')

router.get('/', getCustomerInfo)

module.exports = router