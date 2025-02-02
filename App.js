import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./screens/profileScreen/Profile";
import Main from "./screens/Main";
import { StoreContext } from "./context/storeContext";
import About from "./screens/aboutScreen/About";

const Stack = createStackNavigator();

const App = () => {
  const { isDarkMode } = useContext(StoreContext);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerStyle: {
              backgroundColor: isDarkMode ? "#111827" : "#fff",
            },
            headerTintColor: isDarkMode ? "#fff" : "#000",
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            headerStyle: {
              backgroundColor: isDarkMode ? "#111827" : "#fff",
            },
            headerTintColor: isDarkMode ? "#fff" : "#000",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
