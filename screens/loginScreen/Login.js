import axios from 'axios';
import React, { useContext, useState } from 'react';
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
} from 'react-native';
import { StoreContext } from '../../context/storeContext';

const { width, height } = Dimensions.get('window'); // Get device width and height

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const { userDetails } = useContext(StoreContext);

  const handleNext = async () => {
    if (!email) {
      Alert.alert("Please enter an email.");
      return;
    }
    if (userDetails(email)) {
      navigation.navigate("Main");
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
          <Text style={styles.nextButtonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.createAccountContainer}>
          <Text style={styles.createAccountText}>Don't have an account?</Text>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => navigation.navigate('Register')}
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
    backgroundColor: 'white',
    paddingTop:40
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: width * 0.05, // 5% padding from left and right
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.08, // Adjust font size based on screen width
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: width * 0.04, // Smaller font size for subtitle
    color: '#666',
    marginBottom: 52,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: width * 0.05, // Responsive padding
    marginBottom: 24,
    fontSize: width * 0.04, // Adjust font size for input
  },
  nextButton: {
    backgroundColor: '#4C6FFF',
    borderRadius: 8,
    padding: width * 0.05, // Adjust padding based on screen size
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: width * 0.045, // Responsive font size for button text
    fontWeight: '600',
  },
  orText: {
    color: '#666',
    textAlign: 'center',
    marginVertical: 16,
  },
  googleButton: {
    height: height * 0.07, // Make button height responsive based on screen height
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  googleButtonText: {
    color: '#000',
    fontSize: width * 0.04, // Adjust font size based on screen width
    fontWeight: '600',
  },
  createAccountContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  createAccountText: {
    fontSize: width * 0.04, // Adjust font size for smaller devices
    color: '#666',
    marginBottom: 10,
  },
  createAccountButton: {
    height: height * 0.07, // Responsive height
    backgroundColor: '#4C6FFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  createAccountButtonText: {
    color: 'white',
    fontSize: width * 0.04, // Responsive font size for button text
    fontWeight: '600',
  },
});

export default LoginScreen;
