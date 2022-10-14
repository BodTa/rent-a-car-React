import { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const GeneralContext = createContext({});

export const GeneralProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [favorites, setFavorites] = useState();

  return (
    <GeneralContext.Provider
      value={{ cars, setCars, favorites, setFavorites, ToastContainer, toast }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
