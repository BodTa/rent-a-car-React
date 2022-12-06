import { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
const useSelectInput = (key, initialValue) => {
  const [value, setValue] = useLocalStorage(key, initialValue);
  const reset = () => setValue(initialValue);
  const attributeObj = {
    value,
    onChange: (e) => setValue(e),
  };
  return [value, reset, attributeObj];
};

export default useSelectInput;
