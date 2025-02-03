import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { StoreContext } from "../../context/storeContext";
import IconIonOct from "react-native-vector-icons/SimpleLineIcons";
import mobile from './mobile.jpg'
import watch from './watch.jpg'
import bag from './bag.jpg'

const LostAndFoundScreen = () => {
  const { isDarkMode } = useContext(StoreContext);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const lostItems = [
    {
      id: "1",
      name: "Backpack",
      location: "Library, XYZ University",
      date: "2023-05-15",
      image: bag,
      instagram: "user_123",
      email: "owner1@example.com",
    },
    {
      id: "2",
      name: "Mobile",
      location: "Cafeteria, ABC College",
      date: "2023-05-14",
      image: mobile,
      instagram: "john_doe",
      email: "owner2@example.com",
    },
    {
      id: "3",
      name: "Watch",
      location: "Gym, LMN University",
      date: "2023-05-13",
      image: watch,
      instagram: "jemms",
      email: "owner3@example.com",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={[styles.postContainer, { backgroundColor: theme.cardBackground }]}> 
      <Image source={item.image } style={styles.postImage} />
      <View style={styles.postDetails}>
        <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
        <View style={styles.location}>
          <IconIonOct name="location-pin" size={12} color={isDarkMode ? "#fff" : "#1F2937"} style={{marginTop:3}} />
        <Text style={[styles.itemDetailText, { color: theme.secondaryText }]}> 
          {item.location} • {item.date}
        </Text>
        </View>
        <Text style={[styles.contact, { color: theme.text }]}>Contact</Text>
        <Text style={[styles.contactInfo, { color: theme.text }]}>Instagram: {item.instagram}</Text>
        <Text style={[styles.contactInfo, { color: theme.text }]}>Email: {item.email}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
    <View style={[styles.top, { backgroundColor: theme.topBackgroundColor }]}>
            <Text style={[styles.headerText, { color: theme.headerTextColor }]}>Lost&Found</Text>
          </View>
      <FlatList
        data={lostItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingBottom: 16,
    paddingTop:20
  },
  postContainer: {
    marginBottom: 16,
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    height: 300,
  },
  postDetails: {
    padding: 12,
  },
  location:{
    flexDirection:"row",
    gap:5
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDetailText: {
    fontSize: 14,
    marginBottom: 8,
  },
  contact:{
    color:"#000",
    fontWeight: "bold",
  },
  contactInfo: {
    fontSize: 14,
    fontWeight: 450,
    marginTop: 4,
  },
  top: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingBottom: 15,
    paddingLeft: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    zIndex:99
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const lightTheme = {
  background: "#F8FAFC",
  cardBackground: "#FFFFFF",
  text: "#1F2937",
  secondaryText: "#4B5563",
  iconColor: "#6B7280",
  primary: "#3B82F6",
  topBackgroundColor: "#FFFFFF",
  headerTextColor: "#1F2937",
};

const darkTheme = {
  background: "#1F2937",
  cardBackground: "#374151",
  text: "#F9FAFB",
  secondaryText: "#D1D5DB",
  iconColor: "#9CA3AF",
  primary: "#60A5FA",
  topBackgroundColor: "#111827",
  headerTextColor: "#F9FAFB",
};

export default LostAndFoundScreen;