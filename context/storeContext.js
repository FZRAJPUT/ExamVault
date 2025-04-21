import axios from "axios";
import { createContext, useState } from "react";
import { Alert } from "react-native";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [details, setDetails] = useState(null);
  const [email_otp, setEmail_otp] = useState("");
  const getDetails = async (email) => {
    try {
      const response = await axios.post(`https://examvaultserver.onrender.com/user/details`, { email });
      if (response.data.success) {
        setDetails(response.data.details);
        return response.data.details;
      } else {
        throw new Error(response.data.message || "Failed to get user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      Alert.alert("Error", error.message || "Failed to get user details");
      return null;
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