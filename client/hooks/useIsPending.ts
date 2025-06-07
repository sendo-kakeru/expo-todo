import { useEffect, useRef, useState } from "react";

export const SUBMIT_BUTTON_DELAY_MS = 1000;

export function useIsPending() {
  const [isPending, setIsPending] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startPending = () => {
    setIsPending(true);
  };

  const stopPending = () => {
    timeoutRef.current = setTimeout(() => {
      setIsPending(false);
    }, SUBMIT_BUTTON_DELAY_MS);
  };

  return {
    isPending,
    startPending,
    stopPending,
  };
}
