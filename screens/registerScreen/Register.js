import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    branch: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]); // Log state changes properly

  const handleRegister = async () => {
    if (!formData.fullname || !formData.email || !formData.branch) {
      alert("Please fill all fields.");
      return;
    }
  
    try {
      const response = await axios.post("http://192.168.177.149:3000/user/register", formData);

      console.log(response.data);
      
      // if (response.data.success) {
      //   // await AsyncStorage.setItem("isRegistered", "true");
      //   // alert("Registration successful!");
      //   // navigation.replace("Main");
      // } else {
      //   alert(response.data.message || "Registration failed.");
      // }
    } catch (error) {
      // if (error.response?.status === 409) {
      //   alert("Email is already registered.");
      // } else {
        console.log("Error:", error.message);
        alert("Something went wrong. Please try again.");
      // }
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Register</Text>

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
              keyboardType="email-address"
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
              <Picker.Item label="CSE" value="CSE" />
              <Picker.Item label="ME" value="ME" />
              <Picker.Item label="EE" value="EE" />
              <Picker.Item label="CE" value="CE" />
            </Picker>
          </View>

          <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Continue</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>or</Text>

          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  content: {
    width: "100%",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    marginBottom: 32,
    textAlign: "center",
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
    fontSize: 16,
    color: "#000",
    marginLeft: 16,
  },
  picker: {
    height: 56,
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
  orText: {
    color: "#666",
    textAlign: "center",
    marginVertical: 16,
  },
  googleButton: {
    height: 56,
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    gap: 15,
  },
  googleButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});
