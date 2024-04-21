const connectDb = require('../configs/db')

const customerSchemas = {
    getAllUsers: (callback) => {
        connectDb.query('SELECT * FROM customer', callback)
    },  
}

module.exports = customerSchemas
