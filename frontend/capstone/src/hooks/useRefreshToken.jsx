import axios from "axios";
const API_URL = "http://localhost:3000";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(`${API_URL}/refresh`, {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };

  return refresh;
}

export default useRefreshToken;
