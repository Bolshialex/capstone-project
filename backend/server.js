const express = require('express')
const colors = require('colors')
const port = 3000
const server = express()
const connectDb = require('./src/configs/db')



connectDb;






server.listen(port, () => {
    console.log(`Server listening at port: ${port}`.blue)
})