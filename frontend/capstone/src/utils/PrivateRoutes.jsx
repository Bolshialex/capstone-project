import { Outlet, Navigate } from "react-router-dom";
function PrivateRoutes() {
  const token = getToken();

  return token ? <Outlet /> : <Navigate to={"/"} />;
}

function getToken() {
  const token = localStorage.getItem("token");

  return token;
}

export default PrivateRoutes;
