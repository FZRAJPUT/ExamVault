import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { StoreContext } from "../context/storeContext";
import logo from "./logo.png";
import log_2 from "./logo_2.png";
import user from "./user.jpg";

const TopBar = () => {
  const { isDarkMode } = useContext(StoreContext);
  const navigation = useNavigation();

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.logoContainer}>
        <Image source={!isDarkMode ? logo : log_2} style={styles.logo} />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        accessibilityLabel="Go to Profile"
        accessibilityRole="button"
      >
        <View style={styles.rightContent}>
          <Image
            source={user}
            style={[styles.image, { borderColor: theme.borderColor }]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    position: "absolute",
    top: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 175,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 2,
    zIndex: 99,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 40,
    resizeMode: "contain",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
  },
});

const lightTheme = {
  backgroundColor: "#fff",
  textColor: "#2A3335",
  iconColor: "#2A3335",
  borderColor: "#ccc",
};

const darkTheme = {
  backgroundColor: "#111827",
  textColor: "#fff",
  iconColor: "#fff",
  borderColor: "#444",
};
