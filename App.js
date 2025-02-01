import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterScreen from "./screens/registerScreen/Register";
import IconIon from "react-native-vector-icons/SimpleLineIcons";
import IconIonOct from "react-native-vector-icons/Octicons";
import Upload from "./screens/uploadScreen/Upload";
import LostAndFound from "./screens/lostAndFoundScreen/LostAndFound";
import Settings from "./screens/settingScreen/Settings";
import Search from "./screens/searchScreen/Search";
import Home from "./screens/homeScreen/Home";
import { StoreContext } from "./context/storeContext";

const Tab = createBottomTabNavigator();


export default function App() {
  const {isDarkMode} = useContext(StoreContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor:isDarkMode ? "#111827" : "#fff",
            height:60,
            paddingTop:5,
            borderColor:isDarkMode ? "#111827" : "#fff"
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
            tabBarInactiveTintColor:!isDarkMode ? "#727D73" : "#F5F5F5",
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
            tabBarInactiveTintColor: !isDarkMode ? "#727D73" : "#F5F5F5"
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
    </NavigationContainer>
  );
}
