import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { EXPO_API_URL } from "@env";
import { StoreContext } from "../../context/storeContext";

const { width, height } = Dimensions.get("window");

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    branch: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const {setEmail_otp} = useContext(StoreContext)

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (!formData.fullname || !formData.email || !formData.branch) {
      Alert.alert("Please fill all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${EXPO_API_URL}/user/register`, formData);
      if (response.data.success) {
        await AsyncStorage.setItem(
          "userInfo",
          JSON.stringify({
            isRegistered: true,
            email:formData.email
          })
        );
        setEmail_otp(formData.email)
        navigation.replace("OTP");
      } else {
        Alert.alert("Registration failed", response.data.message || "Please try again.");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong. Please try again.";
      Alert.alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.content}>
              <Text style={styles.title}>Create account</Text>
              <Text style={styles.det}>Please enter your details</Text>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChangeText={(value) => handleChange("fullname", value)}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(value) => handleChange("email", value)}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Select Branch</Text>
                  <Picker
                    selectedValue={formData.branch}
                    style={styles.picker}
                    onValueChange={(value) => handleChange("branch", value)}
                  >
                    <Picker.Item label="Select Branch" value="" />
                    <Picker.Item label="CSE" value="CSE" />
                    <Picker.Item label="ME" value="ME" />
                    <Picker.Item label="EE" value="EE" />
                    <Picker.Item label="CE" value="CE" />
                  </Picker>
                </View>

                <TouchableOpacity
                  onPress={handleRegister}
                  style={[styles.registerButton, isLoading && { opacity: 0.6 }]}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.registerButtonText}>Continue</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Already have an account?</Text>
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate("Login")}
                    disabled={isLoading}
                  >
                    <Text style={styles.loginButtonText}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: width * 0.05,
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    width: "100%",
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: "700",
    color: "#000",
    textAlign: "left",
    marginBottom: 5,
  },
  det: {
    fontSize: width * 0.04,
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "left",
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#f8f8f8",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  input: {
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
  },
  label: {
    fontSize: 14,
    color: "#000",
    marginLeft: 16,
    marginTop: 8,
  },
  picker: {
    height: 56,
    width: "100%",
    paddingHorizontal: 16,
  },
  registerButton: {
    height: 56,
    backgroundColor: "#4C6FFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#4C6FFF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  loginButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#4C6FFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#4C6FFF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
