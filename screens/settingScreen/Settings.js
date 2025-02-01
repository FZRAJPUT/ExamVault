import { StyleSheet, Text, View, ScrollView, Switch, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { Moon, Sun, Bell, Lock, HelpCircle, Info } from "lucide-react-native";
import { StoreContext } from "../../context/storeContext";

export const Settings = () => {
  const { isDarkMode, setIsDarkMode } = useContext(StoreContext);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const toggleNotifications = () => setIsNotificationsEnabled(!isNotificationsEnabled);

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
          <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Notifications</Text>
          {renderSettingItem(
            <Bell size={24} color={theme.iconColor} />,
            "Push Notifications",
            toggleNotifications,
            true,
            isNotificationsEnabled
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Security</Text>
          {renderSettingItem(<Lock size={24} color={theme.iconColor} />, "Change Password", () => {})}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Support</Text>
          {renderSettingItem(<HelpCircle size={24} color={theme.iconColor} />, "Help Center", () => {})}
          {renderSettingItem(<Info size={24} color={theme.iconColor} />, "About", () => {})}
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
    height: 115,
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
    marginBottom: 24,
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