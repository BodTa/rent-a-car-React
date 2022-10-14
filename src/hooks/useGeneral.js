import { useContext } from "react";
import GeneralContext from "../Context/GeneralProvider";

const useGeneral = () => {
  return useContext(GeneralContext);
};

export default useGeneral;
