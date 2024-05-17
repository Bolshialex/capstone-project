import axios from "axios";
const API_URL = "http://localhost:3000";

async function login(email, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export default { login };
