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
    const employee = [
        req.body.first_name,
        req.body.last_name,
        req.body.user_name,
        req.body.phone,
        req.body.email,
        req.body.password,
    ]
    employeeSchemas.createEmployee(employee, (err, result) => {
        if(err){
            res.status(500).json({ error: 'Internal Server Error'})
            console.log(err)
            return
        }
        res.json("Employee Created")
    })
}

const deleteEmployee = (req, res) => {

    const employeeId = req.params.id

    employeeSchemas.deleteEmployee(employeeId, (err, result) => {
        if(err){
            res.status(500).json({ error: 'Internal Server Error'})
            console.log(err)
            return
        }
        res.json(`Employee ${employeeId} deleted`)
    })
}

const getEmployeeById = (req, res) => {
    
    const employeeId = req.params.id

    employeeSchemas.getEmployeeById(employeeId, (err, result) => {
        if(err) {
            res.status(500).json({ error: 'Internal Server Error' })
            console.log(err)
            return
        }else if(result == ""){
            res.json(`This employee does not exist`)
            return
        }
        res.json(result[0])
    })
}



module.exports = {
    getEmployeeInfo,
    createEmployeeInfo,
    deleteEmployee,
    getEmployeeById,
}