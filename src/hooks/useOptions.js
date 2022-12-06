import { useContext } from "react";
import OptionsContext from "../Context/OptionsProvider";

const useOptions = () => {
  return useContext(OptionsContext);
};

export default useOptions;
