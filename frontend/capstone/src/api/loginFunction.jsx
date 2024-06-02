import axios from "axios";
const API_URL = "http://localhost:3000";

async function login(email, password) {
  try {
    await axios.post(
      `${API_URL}/login`,
      {
        email,
        password,
      },
      {
        headers: { "Content-Type": "application/json", withCredentials: true },
      }
    );
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export default { login };
