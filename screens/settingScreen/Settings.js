import { StyleSheet,Alert, Text, View, ScrollView, Switch, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Moon, Sun, HelpCircle, Info, MailIcon, UserRoundPen, LogOut } from "lucide-react-native";
import { StoreContext } from "../../context/storeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Settings = ({ navigation }) => {
  const { isDarkMode, setIsDarkMode } = useContext(StoreContext);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const renderSettingItem = (icon, title, action, hasSwitch = false, switchValue = false) => (
    <TouchableOpacity style={[styles.settingItem, { borderBottomColor: theme.borderColor }]} onPress={action}>
      {icon}
      <Text style={[styles.settingText, { color: theme.textColor }]}>{title}</Text>
      {hasSwitch && (
        <Switch
          value={switchValue}
          onValueChange={action}
          trackColor={{ false: theme.switchTrackColor, true: theme.switchTrackColorOn }}
          thumbColor={switchValue ? theme.switchThumbColorOn : theme.switchThumbColor}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={[styles.top, { backgroundColor: theme.topBackgroundColor }]}>
        <Text style={[styles.headerText, { color: theme.headerTextColor }]}>Settings</Text>
      </View>

      <ScrollView style={styles.main}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Appearance</Text>
          {renderSettingItem(
            isDarkMode ? <Sun size={24} color={theme.iconColor} /> : <Moon size={24} color={theme.iconColor} />,
            isDarkMode ? "Light Mode" : "Dark Mode",
            toggleDarkMode,
            true,
            isDarkMode
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Account</Text>
          {renderSettingItem(<UserRoundPen size={24} color={theme.iconColor} />, "Profile", () => {navigation.navigate("Profile")})}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Security</Text>
          {renderSettingItem(<MailIcon size={24} color={theme.iconColor} />, "Change Email", () => {})}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Support</Text>
          {renderSettingItem(<HelpCircle size={24} color={theme.iconColor} />, "Help Center", () => {})}
          {renderSettingItem(
            <Info size={24} color={theme.iconColor} />,
            "About",
            () => navigation.navigate("About") // Navigate to the About screen
          )}
           {renderSettingItem(
            <LogOut size={24} color={theme.iconColor} />,
            "Log out",
            async () => {
              try {
                await AsyncStorage.clear();
                Alert.alert("Logged out", "You have been logged out.");
                navigation.replace("Login");
              } catch (error) {
                Alert.alert("Error", "Failed to log out.");
                console.error("AsyncStorage clear error:", error);
              }
            }
            
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={[styles.versionText, { color: theme.versionTextColor }]}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

export default Settings;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingBottom: 15,
    paddingLeft: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  main: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  footer: {
    padding: 16,
    alignItems: "center",
  },
  versionText: {
    fontSize: 14,
  },
});

const lightTheme = {
  backgroundColor: "#F8FAFC",
  topBackgroundColor: "#FFFFFF",
  headerTextColor: "#1F2937",
  textColor: "#1F2937",
  sectionTitleColor: "#4B5563",
  borderColor: "#E5E7EB",
  iconColor: "#4B5563",
  versionTextColor: "#6B7280",
  switchTrackColor: "#767577",
  switchTrackColorOn: "#81b0ff",
  switchThumbColor: "#f4f3f4",
  switchThumbColorOn: "#f5dd4b",
};

const darkTheme = {
  backgroundColor: "#1F2937",
  topBackgroundColor: "#111827",
  headerTextColor: "#F9FAFB",
  textColor: "#F9FAFB",
  sectionTitleColor: "#D1D5DB",
  borderColor: "#374151",
  iconColor: "#D1D5DB",
  versionTextColor: "#9CA3AF",
  switchTrackColor: "#4B5563",
  switchTrackColorOn: "#60A5FA",
  switchThumbColor: "#E5E7EB",
  switchThumbColorOn: "#FBBF24",
};