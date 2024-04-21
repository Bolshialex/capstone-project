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

module.exports = {
    getCustomerInfo
}