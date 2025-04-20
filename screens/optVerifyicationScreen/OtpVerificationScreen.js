import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { EXPO_API_URL } from "@env";
import { StoreContext } from "../../context/storeContext";

const OtpVerificationScreen = ({ navigation }) => {
//   const { email } = route.params; // Email passed from the Register screen
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const {email_otp} = useContext(StoreContext)
  

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      Alert.alert("Error", "Please enter the OTP.");
      return;
    }
    try {
      console.log(email_otp);
      let email = email_otp
      setLoading(true);
      const response = await fetch(`${EXPO_API_URL}/user/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      setLoading(false);
      if (data.success) {
        navigation.replace("Main");
      } else {
        Alert.alert("Error", data.message || "OTP verification failed.");
      }
    } catch (error) {
      setLoading(false);
      console.error("OTP Verification Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>OTP Verification</Text>
      <Text style={styles.subText}>Enter the OTP sent to {email_otp}</Text>

      <TextInput
        style={styles.otpInput}
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        placeholder="Enter OTP"
        maxLength={6}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerifyOtp} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Verifying..." : "Verify OTP"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f9fafb",
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 24,
    textAlign: "center",
  },
  otpInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    backgroundColor: "#fff",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
