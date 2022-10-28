import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const GeneralContext = createContext({});

export const GeneralProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [carsTemp, setCarsTemp] = useState([]);
  const [favorites, setFavorites] = useState();
  const [auth, setAuth] = useState();
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
