import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Alert, Appearance } from "react-native";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [details, setDetails] = useState(null);

  const getDeviceTheme = () => {
    const colorScheme = Appearance.getColorScheme();
    return colorScheme === "dark" ? true : false;
  };

  useEffect(() => {
    setIsDarkMode(getDeviceTheme());
    const listener = Appearance.addChangeListener(() => {
      setIsDarkMode(getDeviceTheme());
    });

    return () => {
      listener.remove();
    };
  }, []);

  const contextValue = {
    isDarkMode,
    setIsDarkMode,
    details,
    setDetails
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
