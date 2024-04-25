const connectDb = require('../configs/db')

const customerSchemas = {
    getAllUsers: (callback) => {
        connectDb.query('SELECT * FROM customer', callback)
    },
    getCustomerById: (employeeId, callback) => {
        connectDb.query(`SELECT * FROM customer WHERE id = ${employeeId}`, callback)
    },  
    createCustomer: (customerInfo, callback) => {
        connectDb.query(`INSERT INTO customer (first_name, last_name, user_name, phone, email, password) VALUES ('${customerInfo[0]}', '${customerInfo[1]}', '${customerInfo[2]}', '${customerInfo[3]}', '${customerInfo[4]}', '${customerInfo[5]}')`, callback)
    },
    updateCustomer: (callback) => {
        //Leave update for later 
    },
    deleteCustomer: (customerId, callback) => {
        connectDb.query(`DELETE FROM customer WHERE id = ${customerId}`, callback)
    }
}

module.exports = customerSchemas
