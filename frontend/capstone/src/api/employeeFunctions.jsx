import axios from "axios";
const API_URL = "http://localhost:3000";

function getToken() {
  const cookieString = document.cookie;
  const cookieArray = cookieString.split("; ");
  const accessTokenCookie = cookieArray.find((cookie) =>
    cookie.startsWith("accessToken=")
  );
  const token = accessTokenCookie ? accessTokenCookie.split("=")[1] : null;
  console.log(token);
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
