"use client";

import { useScreenSize } from "@/utils/WindowSize";
import { createContext, useContext } from "react";

const ScreenSizeContext = createContext({
  screenSize: "lg",
  width: 1024,
  height: 768,
});
export const ScreenSizeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { screenSize, width, height } = useScreenSize();

  return (
    <ScreenSizeContext.Provider value={{ screenSize, width, height }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSizeContext = () => useContext(ScreenSizeContext);
