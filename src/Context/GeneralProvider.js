import { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const GeneralContext = createContext({});

export const GeneralProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [carsTemp, setCarsTemp] = useState([]);
  const [favorites, setFavorites] = useState();
  const [auth, setAuth] = useState();

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
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
