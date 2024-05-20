import axios from "axios";
const API_URL = "http://localhost:3000";

function getToken() {
  const authorizationHeader = localStorage.getItem("Authorization");
  const token = authorizationHeader ? authorizationHeader.split(" ")[1] : null;
  return token;
}

// function handleResponse(response) {
//   if (!response.ok) {
//     throw new Error(`Http error. Status: ${response.status}`);
//   }

//   return response.json();
// }

function fetchAllCustomers(token) {
  return axios
    .get(`${API_URL}/customer`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching customers:", error);
      throw error;
    });
}

function fetchCustomerById(customerId) {
  return axios
    .get(`${API_URL}/customer/${customerId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching customer by id:", error);
      throw error;
    });
}

function createCustomer(customerData) {
  const token = getToken();

  return axios
    .post(`${API_URL}/customer`, customerData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating a new customer:", error);
      throw error;
    });
}

function updateCustomer(customerId, customerData) {
  return fetch(`${API_URL}/customer/${customerId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerData),
  })
    .then(handleResponse)
    .catch((error) => {
      console.error("Error updating customer");
      throw new error();
    });
}

function deleteCustomer(customerId) {
  return fetch(`${API_URL}/customer/${customerId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(handleResponse)
    .catch((error) => {
      console.error("Error deleting customer");
      throw new error();
    });
}

export default {
  fetchAllCustomers,
  fetchCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
