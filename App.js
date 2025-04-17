import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "./screens/profileScreen/Profile";
import Main from "./screens/Main";
import { StoreContext } from "./context/storeContext";
import About from "./screens/aboutScreen/About";
import Register from "./screens/registerScreen/Register";
import { ActivityIndicator, View } from "react-native";
import LoginScreen from "./screens/loginScreen/Login";

const Stack = createStackNavigator();

const App = () => {
  const { isDarkMode, userDetails } = useContext(StoreContext);
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("userInfo");
        let parsed = null;
        if (userInfo) {
          parsed = JSON.parse(userInfo);
          setInitialRoute(parsed.isRegistered ? "Main" : "Register");
          userDetails(parsed.email);
        } else {
          setInitialRoute("Register");
        }
      } catch (error) {
        console.error("Error reading AsyncStorage:", error);
        setInitialRoute("Register");
      }
    };
    checkFirstTimeUser();
  }, []);
  
  if (initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerStyle: { backgroundColor: isDarkMode ? "#111827" : "#fff" },
            headerTintColor: isDarkMode ? "#fff" : "#000",
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            headerStyle: { backgroundColor: isDarkMode ? "#111827" : "#fff" },
            headerTintColor: isDarkMode ? "#fff" : "#000",
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
