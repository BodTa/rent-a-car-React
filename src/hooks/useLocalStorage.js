import { useState, useEffect } from "react";

const getLocalValue = (key, initialValue) => {
  if (typeof window === "undefined") return initialValue;

  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;

  if (initialValue instanceof Function) return initialValue();
  return initialValue;
};

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initialValue);
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export default useLocalStorage;
