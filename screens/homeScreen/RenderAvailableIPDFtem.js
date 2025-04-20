import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TextInput,
  Modal,
  Platform,
  Keyboard,
} from "react-native";
import { FileText, Download, RefreshCcw, Bookmark, Search, Filter, X } from "lucide-react-native";
import axios from "axios";
import { EXPO_API_PDF } from "@env";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const AvailablePDFItem = ({ isDarkMode }) => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedFiles, setSavedFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    branch: "all",
    type: "all",
    subject: "all"
  });
  const [availableFilters, setAvailableFilters] = useState({
    branches: [],
    types: [],
    subjects: []
  });
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    
    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const handleDownload = async (url, filename) => {
    try {
      setLoading(true);
      
      const timestamp = new Date().getTime();
      const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileUri = FileSystem.documentDirectory + `${safeFilename}_${timestamp}.pdf`;
      
      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        fileUri
      );
      
      const { uri } = await downloadResumable.downloadAsync();
      
      const isSharingAvailable = await Sharing.isAvailableAsync();
      
      if (isSharingAvailable) {
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          
          await Sharing.shareAsync(uri, {
            mimeType: 'application/pdf',
            dialogTitle: `Share ${filename}`,
            UTI: 'com.adobe.pdf'
          });
        } catch (shareError) {
          Alert.alert(
            'Sharing Error', 
            'Could not share the file. The file has been downloaded and saved to your device.',
            [{ text: 'OK' }]
          );
        }
      } else {
        Alert.alert(
          'Download Complete', 
          `File saved to: ${uri}`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Download Failed', 
        'Failed to download the file. Please try again later.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSavePDF = (item) => {
    if (savedFiles.some(file => file._id === item._id)) {
      setSavedFiles(savedFiles.filter(file => file._id !== item._id));
      Alert.alert('Success', 'PDF removed from saved items');
    } else {
      setSavedFiles([...savedFiles, item]);
      Alert.alert('Success', 'PDF saved successfully');
    }
  };

  const getFiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${EXPO_API_PDF}/files`);
      if (response.data && response.data.files && Array.isArray(response.data.files)) {
        setFiles(response.data.files);
        setFilteredFiles(response.data.files);
        setError(null);
        
        const branches = [...new Set(response.data.files.map(file => file.branch))];
        const types = [...new Set(response.data.files.map(file => file.type))];
        const subjects = [...new Set(response.data.files.map(file => file.subject))];
        
        setAvailableFilters({
          branches: ["all", ...branches],
          types: ["all", ...types],
          subjects: ["all", ...subjects]
        });
      } else {
        setError("Expected an array of files but got different data structure");
      }
    } catch (error) {
      setError("Failed to load files. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  useEffect(() => {
    let result = [...files];
    
    if (searchQuery.trim() !== "") {
      result = result.filter(file => 
        file.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filters.branch !== "all") {
      result = result.filter(file => file.branch === filters.branch);
    }
    
    if (filters.type !== "all") {
      result = result.filter(file => file.type === filters.type);
    }
    
    if (filters.subject !== "all") {
      result = result.filter(file => file.subject === filters.subject);
    }
    
    setFilteredFiles(result);
  }, [files, searchQuery, filters]);

  const resetFilters = () => {
    setFilters({
      branch: "all",
      type: "all",
      subject: "all"
    });
  };

  const applyFilters = () => {
    setShowFilterModal(false);
  };

  if (error) {
    return (
      <Text style={{ padding: 20, color: "red" }}>{error}</Text>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.available}>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => setShowFilterModal(true)}
            style={[styles.filterButton, isDarkMode && styles.darkFilterButton]}
          >
            <Filter size={16} color={"#fff"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={getFiles}
            style={[styles.refreshButton, isDarkMode && styles.darkRefreshButton]}
          >
            <RefreshCcw size={16} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, isDarkMode && styles.darkSearchInput]}>
          <Search size={16} color={isDarkMode ? "#9CA3AF" : "#6B7280"} />
          <TextInput
            style={[styles.searchInput, isDarkMode && styles.darkText]}
            placeholder="Search PDFs..."
            placeholderTextColor={isDarkMode ? "#9CA3AF" : "#6B7280"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <X size={16} color={isDarkMode ? "#9CA3AF" : "#6B7280"} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="40" color="#4a6cf7" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ 
            padding: 6,
            paddingBottom: keyboardHeight > 0 ? keyboardHeight + 10 : 10
          }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {filteredFiles.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Text style={[styles.noResultsText, isDarkMode && styles.darkText]}>
                No PDFs found matching your criteria
              </Text>
            </View>
          ) : (
            filteredFiles.map((item, index) => (
              <View
                key={index}
                style={[styles.availablePdfItem, isDarkMode && styles.darkItem]}
              >
                <View style={styles.pdfInfo}>
                  <View style={styles.pdfTextContainer}>
                    <Text style={[styles.pdfTitle, isDarkMode && styles.darkText]} numberOfLines={1}>
                      {item.filename}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={[styles.pdfSubject, isDarkMode && styles.darkSubText]}>
                        {item.branch=="CSE" ? "CS" : item.branch=="ME" ? "ME" : item.branch=="CE" ? "CE" : "EE"}
                      </Text>
                      <Text style={{ marginHorizontal: 4, color: '#9CA3AF' }}>•</Text>
                      <Text style={[styles.pdfSubject, isDarkMode && styles.darkSubText]}>
                        {item.subject}
                      </Text>
                    </View>
                    <Text style={[styles.pdfType, isDarkMode && styles.darkSubText]}>
                      {item.type}
                    </Text>
                  </View>
                </View>
                <View style={styles.pdfActions}>
                  <TouchableOpacity
                    onPress={() => handleSavePDF(item)}
                    style={styles.actionButton}
                  >
                    <Bookmark
                      size={18}
                      color={savedFiles.some(file => file._id === item._id) ? "#FFD700" : (isDarkMode ? "#60A5FA" : "#3B82F6")}
                      fill={savedFiles.some(file => file._id === item._id) ? "#FFD700" : "none"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDownload(item.cloudinaryUrl, item.filename)}
                    style={styles.actionButton}
                  >
                    <Download
                      size={18}
                      color={isDarkMode ? "#60A5FA" : "#3B82F6"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}

      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isDarkMode && styles.darkModalContent]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, isDarkMode && styles.darkText]}>Filter PDFs</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <X size={20} color={isDarkMode ? "#E5E7EB" : "#374151"} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, isDarkMode && styles.darkText]}>Branch</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterOptions}>
                {availableFilters.branches.map((branch, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterOption,
                      filters.branch === branch && styles.selectedFilterOption,
                      isDarkMode && styles.darkFilterOption
                    ]}
                    onPress={() => setFilters({...filters, branch})}
                  >
                    <Text 
                      style={[
                        styles.filterOptionText, 
                        filters.branch === branch && styles.selectedFilterOptionText,
                        isDarkMode && styles.darkFilterOptionText
                      ]}
                    >
                      {branch === "all" ? "All" : branch}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, isDarkMode && styles.darkText]}>Type</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterOptions}>
                {availableFilters.types.map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterOption,
                      filters.type === type && styles.selectedFilterOption,
                      isDarkMode && styles.darkFilterOption
                    ]}
                    onPress={() => setFilters({...filters, type})}
                  >
                    <Text 
                      style={[
                        styles.filterOptionText, 
                        filters.type === type && styles.selectedFilterOptionText,
                        isDarkMode && styles.darkFilterOptionText
                      ]}
                    >
                      {type === "all" ? "All" : type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, isDarkMode && styles.darkText]}>Subject</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterOptions}>
                {availableFilters.subjects.map((subject, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterOption,
                      filters.subject === subject && styles.selectedFilterOption,
                      isDarkMode && styles.darkFilterOption
                    ]}
                    onPress={() => setFilters({...filters, subject})}
                  >
                    <Text 
                      style={[
                        styles.filterOptionText, 
                        filters.subject === subject && styles.selectedFilterOptionText,
                        isDarkMode && styles.darkFilterOptionText
                      ]}
                    >
                      {subject === "all" ? "All" : subject}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.resetButton]} 
                onPress={resetFilters}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.applyButton]} 
                onPress={applyFilters}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  available: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerActions: {
    width:"100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  refreshButton: {
    backgroundColor: "#4a6cf7",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: "center",
  },
  filterButton: {
    backgroundColor: "#4a6cf7",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: "center",
    marginRight: 8,
  },
  darkRefreshButton: {
    backgroundColor: "#1E3A8A",
  },
  darkFilterButton: {
    backgroundColor: "#1E3A8A",
  },
  searchContainer: {
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  darkSearchInput: {
    backgroundColor: "#374151",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  availablePdfItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  darkItem: {
    backgroundColor: "#374151",
  },
  pdfInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  pdfTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  pdfTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 2,
  },
  pdfSubject: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 1,
  },
  pdfType: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 2,
    fontWeight: "500",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  pdfActions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
  },
  darkText: {
    color: "#E5E7EB",
  },
  darkSubText: {
    color: "#9CA3AF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  noResultsContainer: {
    padding: 20,
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 16,
    color: "#6B7280",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  darkModalContent: {
    backgroundColor: "#1F2937",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: "row",
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    marginRight: 8,
  },
  darkFilterOption: {
    backgroundColor: "#374151",
  },
  selectedFilterOption: {
    backgroundColor: "#4a6cf7",
  },
  filterOptionText: {
    fontSize: 14,
    color: "#6B7280",
  },
  darkFilterOptionText: {
    color: "#9CA3AF",
  },
  selectedFilterOptionText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#F3F4F6",
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: "#4a6cf7",
  },
  resetButtonText: {
    color: "#6B7280",
    fontWeight: "500",
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
});

export default AvailablePDFItem;
