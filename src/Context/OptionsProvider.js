import React, { createContext } from "react";
const OptionsContext = createContext({});
export const OptionsProvider = ({ children }) => {
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
  return (
    <OptionsContext.Provider
      value={{ fuelOptions, gearOptions, doorOpitons, carTypeOptions }}
    >
      {children}
    </OptionsContext.Provider>
  );
};

export default OptionsContext;
