import { useContext } from "react";
import CarsContext from "../Context/CarsProvider";

const useCars = () => {
  return useContext(CarsContext);
};

export default useCars;
