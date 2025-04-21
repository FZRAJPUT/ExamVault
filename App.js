import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Profile from "./screens/profileScreen/Profile";
import Main from "./screens/Main";
import { StoreContext } from "./context/storeContext";
import About from "./screens/aboutScreen/About";
import Register from "./screens/registerScreen/Register";
import LoginScreen from "./screens/loginScreen/Login";
import OtpVerificationScreen from "./screens/optVerifyicationScreen/OtpVerificationScreen";

const Stack = createStackNavigator();

const App = () => {
  const { isDarkMode } = useContext(StoreContext);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Main"}>
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
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OTP"
            component={OtpVerificationScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
