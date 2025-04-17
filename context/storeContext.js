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

  const userDetails = async (email) => {
    try {
      const response = await axios.post(
        "http://192.168.43.149:3000/user/details",
        { email }
      );
      if (!response.data.success) {
        Alert.alert(response.data.message);
        return false;
      }
      setDetails(response.data.details);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Something went wrong."
      );
    }
  };

  const contextValue = {
    isDarkMode,
    setIsDarkMode,
    userDetails,
    details,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
