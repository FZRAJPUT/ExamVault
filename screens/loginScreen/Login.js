import axios from "axios";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { StoreContext } from "../../context/storeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window"); // Get device width and height

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const { setDetails } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    if (!email) {
      Alert.alert("Validation Error", "Please enter an email.");
      return;
    }
      try {
        await AsyncStorage.clear();
      } catch (error) {
        Alert.alert("AsyncStorage clear error:", error);
      }
    setIsLoading(true)
    try {
      const response = await axios.post(`https://examvaultserver.onrender.com/user/details`, {
        email,
      });

      if (response?.data?.success) {
        await AsyncStorage.setItem(
          "userInfo",
          JSON.stringify({
            isRegistered: true,
            email: email,
            details: response.data.details
          }));
        setDetails(response.data.details);
        navigation.navigate("Main");
        setIsLoading(false)
      } else {
        setIsLoading(false)
        Alert.alert(
          "Login Failed",
          response?.data?.message || "Something went wrong."
        );
      }
    } catch (error) {
      setIsLoading(false)
      Alert.alert(
        "Network Error",
        "Failed to connect to server. Please try again."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Good to see you back!</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

<TouchableOpacity style={styles.nextButton} onPress={handleNext}>
  {isLoading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="40" color="#fff" />
    </View>
  ) : (
    <Text style={styles.nextButtonText}>Continue</Text>
  )}
</TouchableOpacity>

        <View style={styles.createAccountContainer}>
          <Text style={styles.createAccountText}>Don't have an account?</Text>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.createAccountButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    justifyContent: "center",
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: "#666",
    marginBottom: 52,
  },
  input: {
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    padding: width * 0.05,
    marginBottom: 24,
    fontSize: width * 0.04,
  },
  nextButton: {
    backgroundColor: "#4C6FFF",
    borderRadius: 8,
    // padding: width * 0.04,
    alignItems: "center",
    height:50,
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
  nextButtonText: {
    color: "white",
    fontSize: width * 0.045,
    fontWeight: "600",
  },
  orText: {
    color: "#666",
    textAlign: "center",
    marginVertical: 16,
  },
  googleButton: {
    height: height * 0.07, // Make button height responsive based on screen height
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  googleButtonText: {
    color: "#000",
    fontSize: width * 0.04, // Adjust font size based on screen width
    fontWeight: "600",
  },
  createAccountContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  createAccountText: {
    fontSize: width * 0.04, // Adjust font size for smaller devices
    color: "#666",
    marginBottom: 10,
  },
  createAccountButton: {
    height: height * 0.07, // Responsive height
    backgroundColor: "#4C6FFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 8,
  },
  createAccountButtonText: {
    color: "white",
    fontSize: width * 0.04,
    fontWeight: "600",
  },
});

export default LoginScreen;
