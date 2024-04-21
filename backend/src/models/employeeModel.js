const connectDb = require('../configs/db')

const employeeSchemas = {
    getAllUsers: (callback) => {
        connectDb.query('SELECT * FROM employee', callback)
    },
    createEmployee: (employeeInfo, callback) => {
        connectDb.query('INSERT INTO employee (first_name, last_name, user_name, phone, email, password, assigned_value) VALUES (?, ?, ?, ?, ?, ?, ?)', [employeeInfo.first_name, employeeInfo.last_name, employeeInfo.user_name, employeeInfo.phone, employeeInfo.email, employeeInfo.password], callback)
    }  
}

module.exports = employeeSchemas