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
  PermissionsAndroid,
  Linking,
  Animated,
  RefreshControl,
} from "react-native";
import { Download, Bookmark, Search, Filter, X, CheckCircle } from "lucide-react-native";
import axios from "axios";
import { EXPO_API_PDF } from "@env";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

const AvailablePDFItem = ({ isDarkMode }) => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
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
  const [storagePermissionGranted, setStoragePermissionGranted] = useState(false);
  const [mediaLibraryPermissionGranted, setMediaLibraryPermissionGranted] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadingFile, setDownloadingFile] = useState(null);
  const [showDownloadComplete, setShowDownloadComplete] = useState(false);
  const [completedFileName, setCompletedFileName] = useState("");
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

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
        setKeyboardHeight(0)
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  // Request permissions once when component mounts
  useEffect(() => {
    const requestPermissions = async () => {
      // Request storage permission for Android
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: "Storage Permission",
              message: "App needs access to storage to download files",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          setStoragePermissionGranted(granted === PermissionsAndroid.RESULTS.GRANTED);
        } catch (err) {
          console.error('Storage permission error:', err);
        }
      }

      // Request media library permission
      try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        setMediaLibraryPermissionGranted(status === 'granted');
      } catch (err) {
        console.error('Media library permission error:', err);
      }
    };

    requestPermissions();
  }, []);

  // Function to show download complete notification
  const showDownloadCompleteNotification = (filename) => {
    setCompletedFileName(filename);
    setShowDownloadComplete(true);
    
    // Animate the notification
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowDownloadComplete(false);
    });
  };

  const handleDownload = async (url, filename) => {
    try {
      // Check if the file is a document file (PDF)
      if (!filename.toLowerCase().endsWith('.pdf')) {
        Alert.alert(
          'Invalid File Type', 
          'The selected file is not a PDF document.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      // Check if permissions are granted
      if (Platform.OS === 'android' && !storagePermissionGranted) {
        Alert.alert(
          'Permission Required',
          'Storage permission is required to download files. Please grant permission in app settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Open Settings', 
              onPress: () => {
                if (Platform.OS === 'android') {
                  Linking.openSettings();
                }
              }
            }
          ]
        );
        return;
      }

      if (!mediaLibraryPermissionGranted) {
        Alert.alert(
          'Permission Required',
          'Media library permission is required to save files. Please grant permission in app settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Open Settings', 
              onPress: () => {
                if (Platform.OS === 'android') {
                  Linking.openSettings();
                }
              }
            }
          ]
        );
        return;
      }
      
      // Set downloading file
      setDownloadingFile(filename);
      setDownloadProgress(0);
      
      // Download the file
      const timestamp = new Date().getTime();
      const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
      
      // For Android, download to Downloads folder
      if (Platform.OS === 'android') {
        const downloadDir = FileSystem.documentDirectory + 'downloads/';
        
        // Create downloads directory if it doesn't exist
        const dirInfo = await FileSystem.getInfoAsync(downloadDir);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(downloadDir, { intermediates: true });
        }
        
        const fileUri = downloadDir + `${safeFilename}_${timestamp}.pdf`;
        
        const downloadResumable = FileSystem.createDownloadResumable(
          url,
          fileUri,
          {},
          (downloadProgress) => {
            const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
            setDownloadProgress(progress);
          }
        );
        
        const { uri } = await downloadResumable.downloadAsync();
        
        // Save to media library
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('ExamVault', asset, false);
        
        // Show download complete notification
        showDownloadCompleteNotification(`${safeFilename}_${timestamp}.pdf`);
      } else {
        // For iOS, use the document directory
        const fileUri = FileSystem.documentDirectory + `${safeFilename}_${timestamp}.pdf`;
        
        const downloadResumable = FileSystem.createDownloadResumable(
          url,
          fileUri,
          {},
          (downloadProgress) => {
            const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
            setDownloadProgress(progress);
          }
        );
        
        const { uri } = await downloadResumable.downloadAsync();
        
        // Save to media library
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('ExamVault', asset, false);
        
        // Show download complete notification
        showDownloadCompleteNotification(`${safeFilename}_${timestamp}.pdf`);
      }
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert(
        'Download Failed', 
        'Failed to download the file. Please try again later.',
        [{ text: 'OK' }]
      );
    } finally {
      setDownloadingFile(null);
      setDownloadProgress(0);
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getFiles().finally(() => setRefreshing(false));
  }, []);

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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#4a6cf7"]}
              tintColor={isDarkMode ? "#60A5FA" : "#4a6cf7"}
            />
          }
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

      {/* Download Progress Indicator */}
      {downloadingFile && (
        <View style={styles.downloadProgressContainer}>
          <View style={styles.downloadProgressContent}>
            <ActivityIndicator size="small" color="#4a6cf7" style={styles.downloadSpinner} />
            <View style={styles.downloadTextContainer}>
              <Text style={styles.downloadingText}>Downloading {downloadingFile}</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${downloadProgress * 100}%` }]} />
              </View>
              <Text style={styles.progressText}>{Math.round(downloadProgress * 100)}%</Text>
            </View>
          </View>
        </View>
      )}
      
      {/* Download Complete Notification */}
      {showDownloadComplete && (
        <Animated.View style={[styles.downloadCompleteContainer, { opacity: fadeAnim }]}>
          <View style={styles.downloadCompleteContent}>
            <CheckCircle size={24} color="#10B981" />
            <Text style={styles.downloadCompleteText}>
              {completedFileName} downloaded successfully
            </Text>
          </View>
        </Animated.View>
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
  filterButton: {
    backgroundColor: "#4a6cf7",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: "center",
  },
  darkFilterButton: {
    backgroundColor: "#1E3A8A",
  },
  searchContainer: {
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
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
  downloadProgressContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  downloadProgressContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadSpinner: {
    marginRight: 12,
  },
  downloadTextContainer: {
    flex: 1,
  },
  downloadingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#4a6cf7',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
  },
  downloadCompleteContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  downloadCompleteContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadCompleteText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 12,
  },
});

export default AvailablePDFItem;
