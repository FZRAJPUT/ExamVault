import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { EXPO_API_URL } from "@env";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [details, setDetails] = useState(null);
  const [email_otp, setEmail_otp] = useState("");

  // const getDeviceTheme = () => {
  //   const colorScheme = Appearance.getColorScheme();
  //   return colorScheme === "dark" ? true : false;
  // };

  // useEffect(() => {
  //   setIsDarkMode(getDeviceTheme());
  //   const listener = Appearance.addChangeListener(() => {
  //     setIsDarkMode(getDeviceTheme());
  //   });

  //   return () => {
  //     listener.remove();
  //   };
  // }, []);

  const getDetails = async (email) => {
    try {
      const response = await axios.post(`${EXPO_API_URL}/user/details`, { email });
      
      if (response.data.success) {
        console.log(response.data.details);
        setDetails(response.data.details);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const contextValue = {
    isDarkMode,
    getDetails,
    setIsDarkMode,
    details,
    setDetails,
    email_otp,
    setEmail_otp,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
