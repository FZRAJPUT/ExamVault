import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import { StoreContext } from "../../context/storeContext";
import IconIonOct from "react-native-vector-icons/SimpleLineIcons";

const LostAndFoundScreen = () => {
  const { isDarkMode } = useContext(StoreContext);
  const theme = isDarkMode ? darkTheme : lightTheme;
  
  // Animation values
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const floatAnim = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      <View style={styles.contentContainer}>
        <Animated.View 
          style={[
            styles.iconContainer, 
            { 
              transform: [
                { scale: pulseAnim },
                { translateY }
              ],
              backgroundColor: theme.cardBackground 
            }
          ]}
        >
          <IconIonOct name="hourglass" size={80} color={theme.primary} />
        </Animated.View>
        
        <Text style={[styles.comingSoonTitle, { color: theme.text }]}>Coming Soon</Text>
        
        <Text style={[styles.comingSoonDescription, { color: theme.secondaryText }]}>
          We're working hard to bring you a feature where you can find and report lost items on campus.
        </Text>
        
        <View style={[styles.progressContainer, { backgroundColor: theme.cardBackground }]}>
          <View style={[styles.progressBar, { backgroundColor: theme.primary }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  iconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  comingSoonTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  comingSoonDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  progressContainer: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    marginTop: 20,
  },
  progressBar: {
    width: "70%",
    height: "100%",
    borderRadius: 3,
  },
});

const lightTheme = {
  background: "#F8FAFC",
  cardBackground: "#FFFFFF",
  text: "#1F2937",
  secondaryText: "#4B5563",
  iconColor: "#6B7280",
  primary: "#3B82F6",
  topBackgroundColor: "#FFFFFF",
  headerTextColor: "#1F2937",
};

const darkTheme = {
  background: "#1F2937",
  cardBackground: "#374151",
  text: "#F9FAFB",
  secondaryText: "#D1D5DB",
  iconColor: "#9CA3AF",
  primary: "#60A5FA",
  topBackgroundColor: "#111827",
  headerTextColor: "#F9FAFB",
};

export default LostAndFoundScreen;