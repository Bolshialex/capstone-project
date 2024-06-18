import { useState, createContext, useEffect } from "react";

//create a context to store the auth state
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  //checks if there is an auth object in the session storage
  const [auth, setAuth] = useState(() => {
    const storedAuth = sessionStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  //removes auth if it is null and sets the auth object in the session storage
  useEffect(() => {
    if (auth) {
      sessionStorage.setItem("auth", JSON.stringify(auth));
    } else {
      sessionStorage.removeItem("auth");
    }
  }, [auth]);

  //logs out user clears the auth object and removes it from session storage
  const logout = () => {
    setAuth(null);
    sessionStorage.removeItem("auth");
  };

  //moves the auth object down to the children for access with the three methods
  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
