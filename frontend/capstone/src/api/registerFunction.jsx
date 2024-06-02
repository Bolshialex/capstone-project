import axios from "axios";
const API_URL = "http://localhost:3000";

function registerEmployee(registerInfo) {
  return axios
    .post(`${API_URL}/register`, registerInfo)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating account:", error.message);
      throw error;
    });
}

export default { registerEmployee };
