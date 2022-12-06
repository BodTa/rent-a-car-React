// Local storage options for boolean variables
import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initialValue) => {
  const [value, setValue] = useLocalStorage(key, initialValue);
  const toggle = (value) => {
    setValue((prev) => {
      return typeof value === "boolean" ? value : !prev;
    });
  };
  return [value, toggle];
};

export default useToggle;
