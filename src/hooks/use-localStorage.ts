import { useMemo } from "react";

export function useLocalStorage(key: string, isObject = true) {
  const value = useMemo(() => {
    const valueItem = localStorage.getItem(key);
    return valueItem ? (isObject ? JSON.parse(valueItem) : valueItem) : null;
  }, []);

  return value;
}
