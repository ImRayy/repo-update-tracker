import { useState, useEffect } from "react";

function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    // Add an event listener for media query changes
    const listener = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", listener);

    // Cleanup function to remove listener on unmount
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return isMobile;
}

export { useMediaQuery };
