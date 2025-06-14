import { useEffect, useRef, useState } from "react";

export const SUBMIT_BUTTON_DELAY_MS = 1000;

export function useIsPending() {
  const [isPending, setIsPending] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
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
