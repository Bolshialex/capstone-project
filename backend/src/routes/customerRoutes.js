const express = require('express')
const router = express.Router()
const {getCustomerInfo,createCustomer,deleteCustomer, getCustomerById} = require('../controllers/customerControllers')

router.get('/', getCustomerInfo).post('/', createCustomer)

//Leave update for later 

router.delete('/:id', deleteCustomer).get('/:id', getCustomerById)

module.exports = router