import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { StoreContext } from "../../context/storeContext";
import { Upload } from "lucide-react-native";

const UploadScreen = () => {
  const { isDarkMode } = useContext(StoreContext);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: theme.iconBackground }]}>
          <Upload size={40} color={theme.primary} />
        </View>
        
        <Text style={[styles.title, { color: theme.text }]}>
          Coming Soon
        </Text>
        
        <Text style={[styles.subtitle, { color: theme.subtitle }]}>
          We're working on something exciting!
        </Text>
        
        <Text style={[styles.description, { color: theme.description }]}>
          The upload feature will be available soon. Stay tuned for updates.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 24,
    maxWidth: 400,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.8,
  },
});

const lightTheme = {
  background: "#FFFFFF",
  text: "#1F2937",
  subtitle: "#4B5563",
  description: "#6B7280",
  primary: "#3B82F6",
  iconBackground: "#F3F4F6",
};

const darkTheme = {
  background: "#111827",
  text: "#F9FAFB",
  subtitle: "#D1D5DB",
  description: "#9CA3AF",
  primary: "#3B82F6",
  iconBackground: "#1F2937",
};

export default UploadScreen;
