import axios from "axios";
const API_URL = "http://localhost:3000";

function getToken() {
  const authorizationHeader = localStorage.getItem("Authorization");
  const token = authorizationHeader ? authorizationHeader.split(" ")[1] : null;
  return token;
}

function fetchAllEmployees(token) {
  return axios
    .get(`${API_URL}/employee`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching employees:", error);
      throw error;
    });
}

export default { fetchAllEmployees };
