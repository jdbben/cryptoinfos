"use client";

import { useCallback, useLayoutEffect, useState } from "react";

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface ScreenDimension {
  screenSize: ScreenSize;
  width: number;
  height: number;
}

function getScreenSize(width: number): ScreenSize {
  if (width >= 1536) {
    return "2xl";
  } else if (width >= 1280) {
    return "xl";
  } else if (width >= 1024) {
    return "lg";
  } else if (width >= 768) {
    return "md";
  } else if (width >= 640) {
    return "sm";
  } else {
    return "xs";
  }
}

export const useScreenSize = (): ScreenDimension => {
  const [screenDimension, setScreenDimension] = useState<ScreenDimension>({
    screenSize: "lg",
    width: 1024,
    height: 768,
  });

  const handleResize = useCallback(() => {
    setScreenDimension({
      screenSize: getScreenSize(window.innerWidth),
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return screenDimension;
};
