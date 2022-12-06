import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api/axios";
const GeneralContext = createContext({});

export const GeneralProvider = ({ children }) => {
  //States
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [carsTemp, setCarsTemp] = useState([]);
  const [favorites, setFavorites] = useState();

  //Error notfier
  const notifyError = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  //Success Notfier
  const notifySuccess = (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const notifyInfo = (message) => {
    toast.info(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  //Getting all brands from Database
  useEffect(() => {
    try {
      const getBrands = async () => {
        const response = await axios.get("/brands/getall");
        setBrands(response.data);
      };
      getBrands();
    } catch (error) {}
    return () => {
      setBrands();
    };
  }, []);

  //Getting all cvolors from Database
  useEffect(() => {
    try {
      const getColors = async () => {
        const response = await axios.get("/colors/getall");
        setColors(response.data);
      };
      getColors();
    } catch (error) {}
  }, []);

  //Turning brands into Select options
  const brandOptions = brands?.map((brand) => {
    return {
      value: brand.brandId,
      label: brand.brandName,
    };
  });

  //Turning colors into Select options
  const colorOptions = colors?.map((color) => {
    return {
      value: color.colorId,
      label: color.colorName,
    };
  });

  //Returning Datas to children of this Context
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
        colors,
        setColors,
        brands,
        setBrands,
        brandOptions,
        colorOptions,
        notifyError,
        notifyInfo,
        notifySuccess,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
