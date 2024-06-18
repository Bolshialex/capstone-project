import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

//cleans up the auth context

function useAuth() {
  return useContext(AuthContext);
}
//first initialized in login
export default useAuth;
