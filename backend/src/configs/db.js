const mysql = require('mysql2')

//make async 
const connectDb = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'alex123',
    database: 'capstonedb'
})

module.exports = connectDb