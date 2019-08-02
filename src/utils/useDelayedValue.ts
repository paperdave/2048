import { useEffect, useState } from "react";

/** Returns the value passed, but changes are delayed by the time given */
export default function useDelayedValue<T>(value: T, delay: number): T {
  const [current, setCurrent] = useState<T>(value);

  useEffect(() => {
    if(current !== value) {
      const timer = setTimeout(() => {
        setCurrent(value);
      }, delay);

      return () => {
        clearTimeout(timer)
      };
    }
  }, [current, delay, value]);

  return current;
}
