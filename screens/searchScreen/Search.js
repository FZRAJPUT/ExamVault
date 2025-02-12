import React, { useState, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Search } from 'lucide-react-native';
import { StoreContext } from "../../context/storeContext";

// Sample data
const syllabusData = [
  { id: '1', title: 'Introduction to Computer Science' },
  { id: '2', title: 'Data Structures and Algorithms' },
  { id: '3', title: 'Database Management Systems' },
  { id: '4', title: 'Operating Systems' },
  { id: '5', title: 'Computer Networks' },
];

const pyqData = [
  { id: '1', title: 'CS101 - Spring 2022' },
  { id: '2', title: 'CS202 - Fall 2021' },
  { id: '3', title: 'CS303 - Summer 2022' },
  { id: '4', title: 'CS404 - Winter 2021' },
  { id: '5', title: 'CS505 - Spring 2023' },
];

const lostItemsData = [
  { id: '1', title: 'Blue Notebook - Found in Library' },
  { id: '2', title: 'Black Umbrella - Found near Cafeteria' },
  { id: '3', title: 'USB Drive - Found in Computer Lab' },
  { id: '4', title: 'Red Water Bottle - Found in Gym' },
  { id: '5', title: 'Gray Sweater - Found in Lecture Hall' },
];

const SearchScreen = () => {
  const { isDarkMode } = useContext(StoreContext);
  const [activeTab, setActiveTab] = useState('Syllabus');
  const [searchQuery, setSearchQuery] = useState('');

  const theme = isDarkMode ? darkTheme : lightTheme;

  const getFilteredData = () => {
    const query = searchQuery.toLowerCase();
    switch (activeTab) {
      case 'Syllabus':
        return syllabusData.filter(item => item.title.toLowerCase().includes(query));
      case 'PYQs':
        return pyqData.filter(item => item.title.toLowerCase().includes(query));
      case 'Lost Items':
        return lostItemsData.filter(item => item.title.toLowerCase().includes(query));
      default:
        return [];
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.itemContainer, { backgroundColor: theme.itemBackground }]}>      
      <Text style={[styles.itemTitle, { color: theme.text }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>      
      <View style={[styles.searchContainer, { backgroundColor: theme.searchBackground }]}>        
        <Search size={17} color={theme.iconColor} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search..."
          placeholderTextColor={theme.placeholderText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabContainer}>
        {['Syllabus', 'PYQs', 'Lost Items'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && { backgroundColor: theme.primary }]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && { color: theme.activeTabText }]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={getFilteredData()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const lightTheme = {
  background: '#F8FAFC',
  text: '#333',
  itemBackground: '#fff',
  searchBackground: '#fff',
  iconColor: '#666',
  placeholderText: '#999',
  primary: '#007AFF',
  activeTabText: '#fff',
};

const darkTheme = {
  background: '#1F2937',
  text: '#FFF',
  itemBackground: '#374151',
  searchBackground: '#374151',
  iconColor: '#BBB',
  placeholderText: '#AAA',
  primary: '#007AFF',
  activeTabText: '#000',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    margin: 16,
    paddingHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop:40
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tabText: {
    fontSize: 16,
    color: '#007AFF',
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemTitle: {
    fontSize: 16,
  },
});

export default SearchScreen;