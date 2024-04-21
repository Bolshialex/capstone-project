const connectDb = require('../configs/db')
const employeeSchemas = require('../models/employeeModel')


connectDb;

const getEmployeeInfo = (req,res) => {
    employeeSchemas.getAllUsers((err, emp) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' })
            return
        }
        res.json(emp)
    })
}

const createEmployeeInfo = (req,res) => {
    const employeeInfo = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_name: req.body.user_name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
    }
    console.log(employeeInfo)
    employeeSchemas.createEmployee(employeeInfo, (err, emp) => {
        if (err) {
            
            res.json({ error: 'Internal Server Error' })
            return
        }
        res.json({ message: 'employee created successfully', employeeId: emp.insertId });
    })
}

module.exports = {
    getEmployeeInfo,
    createEmployeeInfo,
}