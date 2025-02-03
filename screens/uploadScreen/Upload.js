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
      contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}
    >
        <View style={[styles.top, { backgroundColor: theme.topBackgroundColor }]}>
          <Text style={[styles.headerText, { color: theme.headerTextColor }]}>
            Upload Lost Items
          </Text>
        </View>
      <View style={styles.centeredContainer}>
  
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
      </View>
    </ScrollView>
  );  
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredContainer: {
    width: "90%",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
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
  placeholderText: {
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    marginLeft: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    height: 40,
    width: "100%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom:30
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  top: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 15,
    paddingLeft: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 99,
    marginBottom:90
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
  inputBackground: "#EEEEEE",
  primary: "#2563EB",
  topBackgroundColor: "#FFFFFF",
  headerTextColor: "#1F2937",
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
