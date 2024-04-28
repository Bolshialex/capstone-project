const connectDb = require("../configs/db");

const registrationSchema = {
  registerCustomer: (registrationInfo, hashedPassword, callback) => {
    connectDb.query(
      `INSERT INTO customer (first_name, last_name, user_name, phone, email, password) VALUES ('${registrationInfo[0]}', '${registrationInfo[1]}', '${registrationInfo[2]}', '${registrationInfo[3]}', '${registrationInfo[4]}', '${hashedPassword}')`,
      callback
    );
  },
  findCustomer: (registrationEmail, callback) => {
    connectDb.query(
      `SELECT * FROM employee WHERE email LIKE '${registrationEmail}'`,
      callback
    );
  },
};

module.exports = registrationSchema;
