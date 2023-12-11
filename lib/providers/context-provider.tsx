"use client";

import { useState, createContext } from "react";

type Type = { showNavigation: boolean; toggleShowNavigation: () => void };

export const NavigationContext = createContext<Type>({
  showNavigation: false,
  toggleShowNavigation: () => {},
});

const ContexProvider = ({ children }: { children: React.ReactNode }) => {
  const [showNavigation, setShowNavigation] = useState(false);

  const toggleShowNavigation = () => {
    setShowNavigation((showNavigation) => !showNavigation);
  };

  return (
    <NavigationContext.Provider
      value={{
        showNavigation,
        toggleShowNavigation,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default ContexProvider;
