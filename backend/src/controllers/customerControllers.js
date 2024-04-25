const connectDb = require('../configs/db')
const customerSchemas = require('../models/customerModel')

connectDb;

const getCustomerInfo = (req,res) => {
    customerSchemas.getAllUsers((err, cust) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' })
            return
        }
        res.json(cust)
    })
}

const createCustomer = (req, res) => {
    const customerInfo = [
        req.body.first_name,
        req.body.last_name,
        req.body.user_name,
        req.body.phone,
        req.body.email,
        req.body.password,
    ]
    customerSchemas.createCustomer(customerInfo, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' })
            console.log(err)
            return
        }
        res.json("Customer Created")
    })
}

const deleteCustomer = (req, res) => {
    const customerId = req.params.id

    customerSchemas.deleteCustomer(customerId, (err, result) => {
        if(err) {
            res.status(500).json({ error: 'Internal Server Error' })
            console.log(err)
            return
        }
        res.json(`Customer ${customerId} deleted`)
    })
}

const getCustomerById = (req, res) => {
    const customerId = req.params.id

    customerSchemas.getCustomerById(customerId, (err, result) => {
        if(err) {
            res.status(500).json({ error: 'Internal Server Error' })
            console.log(err)
            return
        }else if(result == ""){
            res.json(`This customer does not exist`)
            return
        }
        res.json(result[0])
    })
}

module.exports = {
    getCustomerInfo,
    createCustomer,
    deleteCustomer,
    getCustomerById,
}