import axios from "axios";
const API_URL = "http://localhost:3000";

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

function createNewEmployee(token, employeeData) {
  return axios
    .post(`${API_URL}/employee`, employeeData, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating employee:", error);
      throw error;
    });
}

function deleteEmployee(token, employeeId) {
  return axios
    .delete(`${API_URL}/employee/${employeeId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then()
    .catch((error) => {
      console.error("Error deleting customer", error);
      throw error;
    });
}

export default { fetchAllEmployees, createNewEmployee, deleteEmployee };
