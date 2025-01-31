import React from "react";
import { NavigationContainer } from "@react-navigation/native"; // Main navigation container
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Bottom tab navigator
import RegisterScreen from "./screens/Register";
import IconIon from "react-native-vector-icons/SimpleLineIcons";
import IconIonOct from "react-native-vector-icons/Octicons";
import Upload from "./screens/Upload";
import LostAndFound from "./screens/LostAndFound";
import Settings from "./screens/Settings";
import Search from "./screens/Search";
import Home from "./screens/Home";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#000",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <IconIonOct name="home" size={24} color={color} />
            ),
            tabBarActiveTintColor: "#7579E7",
            tabBarInactiveTintColor: "#fff",
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color, size }) => (
              <IconIonOct name="search" size={24} color={color} />
            ),
            tabBarActiveTintColor: "#7579E7",
            tabBarInactiveTintColor: "#fff",
          }}
        />
        <Tab.Screen
          name="Upload"
          component={Upload}
          options={{
            tabBarLabel: "Upload",
            tabBarIcon: ({ color, size }) => (
              <IconIonOct name="plus" size={24} color={color} />
            ),
            tabBarActiveTintColor: "#7579E7",
            tabBarInactiveTintColor: "#fff",
          }}
        />
        <Tab.Screen
          name="Post"
          component={LostAndFound}
          options={{
            tabBarLabel: "Lost&Found",
            tabBarIcon: ({ color, size }) => (
              <IconIonOct name="image" size={24} color={color} />
            ),
            tabBarActiveTintColor: "#7579E7",
            tabBarInactiveTintColor: "#fff",
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <IconIon name="settings" size={24} color={color} />
            ),
            tabBarActiveTintColor: "#7579E7",
            tabBarInactiveTintColor: "#fff",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
