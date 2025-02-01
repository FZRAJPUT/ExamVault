import { createContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [isDarkMode, setIsDarkMode] = useState(false);


    const getDeviceTheme = () => {
      const colorScheme = Appearance.getColorScheme();
      return colorScheme === "dark" ? true : false;
    };

    useEffect(() => {
      setIsDarkMode(getDeviceTheme());
    }, [])
    
    const contextValue = {
        isDarkMode,
        setIsDarkMode
    }



    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;