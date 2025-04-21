import React, { useContext, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import IconIon from "react-native-vector-icons/SimpleLineIcons";
import IconIonOct from "react-native-vector-icons/Octicons";
import Upload from "./uploadScreen/Upload";
import LostAndFound from "./lostAndFoundScreen/LostAndFound";
import Settings from "./settingScreen/Settings";
import Home from "./homeScreen/Home";
import { StoreContext } from "../context/storeContext"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { isDarkMode } = useContext(StoreContext);
  
  return (
    <View style={[styles.drawerContent, { backgroundColor: isDarkMode ? "#000" : "#fff" }]}>
      <View style={styles.drawerHeader}>
        <Text style={[styles.headerText, { color: isDarkMode ? "#fff" : "#000" }]}>ExamVault</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerSection}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default function Main({navigation}) {
  const { isDarkMode, getDetails, setDetails } = useContext(StoreContext);

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("userInfo");
        let parsed = null;
        if (userInfo) {
          try {
            parsed = JSON.parse(userInfo);
            
            // Check if we have details directly (from Login) or need to get them (from Register)
            if (parsed.details) {
              // User info from Login screen
              setDetails(parsed.details);
              navigation.navigate("Main");
            } else if (parsed.email) {
              // User info from Register screen
              await getDetails(parsed.email);
              parsed.isRegistered ? navigation.navigate("Main") : navigation.navigate("Register");
            } else {
              throw new Error("Invalid user info format");
            }
          } catch (parseError) {
            console.error("Error parsing user info:", parseError);
            await AsyncStorage.removeItem("userInfo");
            navigation.navigate("Login");
          }
        } else {
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error reading AsyncStorage:", error);
        navigation.navigate("Login");
      }
    };
    checkFirstTimeUser();
  }, []);
  
  return (
    <Drawer.Navigator
      initialRouteName="ExamVault"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: isDarkMode ? "#000" : "#fff",
        },
        headerTintColor: isDarkMode ? "#fff" : "#000",
        drawerStyle: {
          backgroundColor: isDarkMode ? "#000" : "#fff",
          width: 140,
        },
        drawerActiveTintColor: "#000000",
        drawerInactiveTintColor: "#A6AEBF",
        drawerLabel: () => null,
        drawerItemStyle: {
          backgroundColor: 'transparent',
          borderRadius: 0,
          marginVertical: 0,
          marginHorizontal: 0,
          paddingVertical: 0,
          paddingRight: 16,
          height: 60,
          justifyContent: 'space-between',
        },
        drawerActiveBackgroundColor: 'transparent',
        drawerIconContainerStyle: {
          marginLeft: 0,
        },
      }}
    >
      <Drawer.Screen
        name="ExamVault"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconIonOct name="home" size={size} color={color} />
          ),
          title: "ExamVault",
        }}
      />
      <Drawer.Screen
        name="Upload"
        component={Upload}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconIon name="plus" size={size} color={color} />
          ),
          title: "Upload",
        }}
      />
      <Drawer.Screen
        name="Lost&Found"
        component={LostAndFound}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconIonOct name="image" size={size} color={color} />
          ),
          title: "Lost & Found",
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconIon name="settings" size={size} color={color} />
          ),
          title: "Settings",
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    height: 120,
    justifyContent: "flex-end",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
  },
  drawerSection: {
    paddingTop: 8,
  },
});
