import { StyleSheet,Alert, Text, View, Switch, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { HelpCircle, Info, MailIcon, UserRoundPen, LogOut, Bookmark } from "lucide-react-native";
import { StoreContext } from "../../context/storeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Settings = ({ navigation }) => {
  const { isDarkMode } = useContext(StoreContext);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const renderSettingItem = (icon, title, action, hasSwitch = false, switchValue = false) => (
    <TouchableOpacity style={[styles.settingItem, { borderBottomColor: theme.borderColor }]} onPress={action}>
      {icon}
      <Text style={[styles.settingText, title === "Log out"? { color: "red" } : {color: theme.textColor}]}>{title}</Text>
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

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Account</Text>
          {renderSettingItem(<UserRoundPen size={24} color={"#711DB0"} />, "Profile", () => {navigation.navigate("Profile")})}
          {renderSettingItem(<Bookmark size={24} color={"#4a6cf7"} />, "Saved", () => {})}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Security</Text>
          {renderSettingItem(<MailIcon size={24} color={"#00DFA2"} />, "Change Email", () => {})}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Support</Text>
          {renderSettingItem(<HelpCircle size={24} color={"#A149FA"} />, "Help Center", () => {})}
          {renderSettingItem(
            <Info size={24} color={"#400D51"} />,
            "About",
            () => navigation.navigate("About") // Navigate to the About screen
          )}
           {renderSettingItem(
            <LogOut size={24} color={"red"} />,
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
      {/* </ScrollView> */}

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
  main: {
    flex: 1,
    paddingHorizontal:16
  },
  section: {
    marginBottom: 18,
    paddingHorizontal:16,
    paddingTop:15
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
    // padding: 16,
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