import { useState, useEffect } from "react";

const getLocalStorageValue = (key: string, initValue: any) => {
  if (typeof window === "undefined") return initValue;

  const item = localStorage.getItem(key);
  return item ? item : initValue;
};

const useLocalStorage = (key: string, initValue: any) => {
  const [value, setValue] = useState(() =>
    getLocalStorageValue(key, initValue)
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
