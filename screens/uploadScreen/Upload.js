import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera, Image as ImageIcon, Upload } from "lucide-react-native";
import { StoreContext } from "../../context/storeContext";

const UploadScreen = () => {
  const { isDarkMode } = useContext(StoreContext);
  const [image, setImage] = useState(null);
  const [itemName, setItemName] = useState("");
  const [location, setLocation] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [emailId, setEmailId] = useState("");

  const theme = isDarkMode ? darkTheme : lightTheme;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!image || !itemName || !location || !instagramId || !emailId) {
      Alert.alert("Error", "Please fill in all fields and upload an image");
      return;
    }

    console.log({ image, itemName, location, instagramId, emailId });
    Alert.alert("Success", "Item uploaded successfully");
    setImage(null);
    setItemName("");
    setLocation("");
    setInstagramId("");
    setEmailId("");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.title, { color: theme.text }]}>
        Upload Lost Item
      </Text>

      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View
            style={[
              styles.placeholderImage,
              { backgroundColor: theme.placeholderBackground },
            ]}
          >
            <ImageIcon size={50} color={theme.placeholderIcon} />
            <Text
              style={[styles.placeholderText, { color: theme.placeholderText }]}
            >
              No image selected
            </Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.buttonBackground }]}
          onPress={takePhoto}
        >
          <Camera size={24} color={theme.buttonText} />
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            Take Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.buttonBackground }]}
          onPress={pickImage}
        >
          <Upload size={24} color={theme.buttonText} />
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            Upload Image
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.inputBackground, color: theme.text },
        ]}
        placeholder="Item Name"
        placeholderTextColor={theme.placeholderText}
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.inputBackground, color: theme.text },
        ]}
        placeholder="Location"
        placeholderTextColor={theme.placeholderText}
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.inputBackground, color: theme.text },
        ]}
        placeholder="Instagram ID"
        placeholderTextColor={theme.placeholderText}
        value={instagramId}
        onChangeText={setInstagramId}
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.inputBackground, color: theme.text },
        ]}
        placeholder="Email ID"
        placeholderTextColor={theme.placeholderText}
        value={emailId}
        onChangeText={setEmailId}
        keyboardType="email-address"
      />

      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: theme.primary }]}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20 
  },
  imageContainer: { 
    alignItems: "center", 
    marginBottom: 20 
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  placeholderImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: { marginTop: 10 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: { marginLeft: 10 },
  input: {
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: { 
    color: "#FFFFFF", 
    fontWeight: "bold" 
  },
});

const lightTheme = {
  background: "#F8FAFC",
  text: "#1F2937",
  placeholderBackground: "#E5E7EB",
  placeholderIcon: "#9CA3AF",
  placeholderText: "#6B7280",
  buttonBackground: "#3B82F6",
  buttonText: "#FFFFFF",
  inputBackground: "#FFFFFF",
  primary: "#2563EB",
};

const darkTheme = {
  background: "#1F2937",
  text: "#F9FAFB",
  placeholderBackground: "#4B5563",
  placeholderIcon: "#D1D5DB",
  placeholderText: "#9CA3AF",
  buttonBackground: "#3B82F6",
  buttonText: "#FFFFFF",
  inputBackground: "#374151",
  primary: "#3B82F6",
};

export default UploadScreen;
