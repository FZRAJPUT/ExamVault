import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IconIon from "react-native-vector-icons/SimpleLineIcons";
import IconIonOct from "react-native-vector-icons/Octicons";
import Upload from "./uploadScreen/Upload";
import LostAndFound from "./lostAndFoundScreen/LostAndFound";
import Settings from "./settingScreen/Settings";
import Home from "./homeScreen/Home";
import { StoreContext } from "../context/storeContext"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

export default function Main({navigation}) {
  const { isDarkMode, getDetails } = useContext(StoreContext);

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("userInfo");
        let parsed = null;
        if (userInfo) {
          parsed = JSON.parse(userInfo);
          getDetails(parsed.email);
          parsed.isRegistered ? navigation.navigate("Main") : navigation.navigate("Register");
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
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDarkMode ? "#000" : "#fff",
            height: 60,
            paddingTop: 2,
            paddingBottom: 5,
            borderColor: isDarkMode ? "#3C3D37" : "#fff",
            position: "fixed",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <IconIonOct name="home" size={size} color={color} />
            ),
            tabBarActiveTintColor: "#4C6FFF",
            tabBarInactiveTintColor: !isDarkMode ? "#727D73" : "#F5F5F5",
          }}
        />
        <Tab.Screen
          name="Upload"
          component={Upload}
          options={{
            tabBarLabel: "Upload",
            tabBarIcon: ({ color, size }) => (
              <IconIon name="plus" size={size} color={color} />
            ),
            tabBarActiveTintColor: "#4C6FFF", 
            tabBarInactiveTintColor: !isDarkMode ? "#727D73" : "#F5F5F5",
          }}
        />
        <Tab.Screen
          name="Post"
          component={LostAndFound}
          options={{
            tabBarLabel: "Lost&Found",
            tabBarIcon: ({ color, size }) => (
              <IconIonOct name="image" size={size} color={color} />
            ),
            tabBarActiveTintColor: "#4C6FFF", 
            tabBarInactiveTintColor: !isDarkMode ? "#727D73" : "#F5F5F5",
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <IconIon name="settings" size={size} color={color} />
            ),
            tabBarActiveTintColor: "#4C6FFF", 
            tabBarInactiveTintColor: !isDarkMode ? "#727D73" : "#F5F5F5",
          }}
        />
      </Tab.Navigator>
  );
}
