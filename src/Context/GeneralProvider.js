import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api/axios";
const GeneralContext = createContext({});

export const GeneralProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [carsTemp, setCarsTemp] = useState([]);
  const [favorites, setFavorites] = useState();
  const brandOptions = brands?.map((brand) => {
    return {
      value: brand.brandId,
      label: brand.brandName,
    };
  });
  const colorOptions = colors?.map((color) => {
    return {
      value: color.colorId,
      label: color.colorName,
    };
  });
  const fuelOptions = [
    { value: 1, label: "Diesel" },
    { value: 5, label: "Gasoline" },
    { value: 2, label: "Hybrid" },
    { value: 3, label: "LPG" },
    { value: 4, label: "Electricity" },
  ];
  const gearOptions = [
    { value: 1, label: "Manuel" },
    { value: 2, label: "Automatic" },
    { value: 3, label: "Triptonik" },
  ];
  const doorOpitons = [
    { value: 1, label: "2" },
    { value: 2, label: "4" },
    { value: 3, label: "6" },
    { value: 4, label: "6+" },
  ];
  const carTypeOptions = [
    { value: 1, label: "Coupe" },
    { value: 5, label: "Convertible" },
    { value: 2, label: "Hatchback" },
    { value: 3, label: "Sedan" },
    { value: 4, label: "SUV" },
    { value: 5, label: "Crossover" },
    { value: 6, label: "Sport" },
    { value: 7, label: "Minivan" },
    { value: 8, label: "Wagon" },
    { value: 9, label: "Van" },
    { value: 10, label: "Super" },
    { value: 10, label: "Truck" },
  ];
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : {}
  );
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark")) ? true : false
  );

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
  useEffect(() => {
    try {
      const getColors = async () => {
        const response = await axios.get("/colors/getall");
        setColors(response.data);
      };
      getColors();
    } catch (error) {}
  }, []);
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
        colors,
        setColors,
        brands,
        setBrands,
        brandOptions,
        colorOptions,
        fuelOptions,
        gearOptions,
        doorOpitons,
        carTypeOptions,
        notifyError,
        notifySuccess,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
