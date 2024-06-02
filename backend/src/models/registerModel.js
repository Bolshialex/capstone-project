const connectDb = require("../configs/db");
const registerSchemas = {
  registerEmployee: (registrationInfo, hashedPassword, callback) => {
    const query =
      "INSERT INTO employee (first_name, last_name, user_name, phone, email, password) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [...registrationInfo, hashedPassword];
    connectDb.query(query, values, callback);
  },
};
module.exports = registerSchemas;
