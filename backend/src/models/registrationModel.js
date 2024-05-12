const connectDb = require("../configs/db");
const { registerEmployee } = require("../controllers/registrationController");

const registrationSchema = {
  registerEmployee: (registrationInfo, hashedPassword, callback) => {
    const query =
      "INSERT INTO employee (first_name, last_name, user_name, phone, email, password) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [...registrationInfo, hashedPassword];
    connectDb.query(query, values, callback);
  },
  findEmployee: (registrationEmail, callback) => {
    const query = "SELECT * FROM employee WHERE email LIKE ?";
    const values = [registrationEmail];
    connectDb.query(query, values, callback);
  },
};

module.exports = registrationSchema;
