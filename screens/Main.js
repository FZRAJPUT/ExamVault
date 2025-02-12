import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IconIon from "react-native-vector-icons/SimpleLineIcons";
import IconIonOct from "react-native-vector-icons/Octicons";
import Upload from "./uploadScreen/Upload";
import LostAndFound from "./lostAndFoundScreen/LostAndFound";
import Settings from "./settingScreen/Settings";
import Search from "./searchScreen/Search";
import Home from "./homeScreen/Home";
import { StoreContext } from "../context/storeContext"; 

const Tab = createBottomTabNavigator();

export default function Main() {
  const { isDarkMode } = useContext(StoreContext);
  
  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDarkMode ? "#000" : "#fff",
            height: 50,
            paddingTop: 2,
            paddingBottom: 5,
            borderColor: isDarkMode ? "#3C3D37" : "#fff",
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
          name="Search"
          component={Search}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color, size }) => (
              <IconIonOct name="search" size={size} color={color} />
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
