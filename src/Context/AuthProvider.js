import { useState, createContext } from "react";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // const [persist, setPersist] = useState(
  //   JSON.parse(localStorage.getItem("persist") || false)
  // );

  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : {}
  );

  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark")) || false
  );

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isDark,
        setIsDark,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
