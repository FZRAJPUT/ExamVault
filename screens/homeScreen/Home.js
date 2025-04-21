import {
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import WelcomePopup from "./WelcomePopup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoreContext } from "../../context/storeContext";
import AvailablePDFItem from "./RenderAvailableIPDFtem";


const Home = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const { isDarkMode, setIsDarkMode } = useContext(StoreContext);
  const colorScheme = useColorScheme();

  useEffect(() => {
    checkFirstVisit();
    setIsDarkMode(colorScheme === "dark");
  }, [colorScheme]);

  const checkFirstVisit = async () => {
    try {
      const hasVisited = await AsyncStorage.getItem("hasVisited");
      if (!hasVisited) {
        setIsFirstVisit(true);
        await AsyncStorage.setItem("hasVisited", "true");
      }
    } catch (error) {
      console.error("Error checking first visit:", error);
    }
  };

  return (
    <View
      style={styles.container}
    >
      {isFirstVisit && <WelcomePopup />}
        <AvailablePDFItem isDarkMode={isDarkMode} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  }
 });
