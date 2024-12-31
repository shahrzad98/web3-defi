import { useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
}

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
    isMobile: false,
  });

  useEffect(() => {
    const handler = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 600,
      });
    };

    // Set size at the first mount
    handler();
    window.addEventListener("resize", handler);

    // Remove listener on cleanup
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return windowSize;
}

export default useWindowSize;
