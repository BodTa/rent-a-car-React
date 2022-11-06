import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const GeneralContext = createContext({});

export const GeneralProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [carsTemp, setCarsTemp] = useState([]);
  const [favorites, setFavorites] = useState();
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : {}
  );
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark")) ? true : false
  );

  return (
    <GeneralContext.Provider
      value={{
        carsTemp,
        setCarsTemp,
        cars,
        setCars,
        favorites,
        setFavorites,
        ToastContainer,
        toast,
        auth,
        setAuth,
        isDark,
        setIsDark,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
