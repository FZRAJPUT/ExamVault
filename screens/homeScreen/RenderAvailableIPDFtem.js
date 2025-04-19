import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";
import { FileText, Download, RefreshCcw } from "lucide-react-native";
import axios from "axios";
import { EXPO_API_PDF } from "@env";

const AvailablePDFItem = ({ isDarkMode }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = (url) => {
    Linking.openURL(url);
  };

  const getFiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${EXPO_API_PDF}/files`);
      if (Array.isArray(response.data)) {
        setFiles(response.data);
        setError(null);
      } else {
        setError("Expected an array but got different data structure");
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      setError("Failed to load files. Please try again later.");
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  if (error) {
    return (
      <Text style={{ padding: 20, color: "red" }}>{error}</Text>
    );
  }

  return (
    <>
      <View style={styles.available}>
        <Text style={styles.sectionTitle}>All Available PDFs</Text>
        <TouchableOpacity
          onPress={getFiles}
          style={[styles.refreshButton, isDarkMode && styles.darkRefreshButton]}
        >
          <RefreshCcw size={18} color={"#fff"} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="40" color="#4a6cf7" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: 5 }}
        >
          {files.map((item, index) => (
            <View
              key={index}
              style={[styles.availablePdfItem, isDarkMode && styles.darkItem]}
            >
              <View style={styles.pdfInfo}>
                <FileText size={24} color={"#ff4d4d"} />
                <View style={styles.pdfTextContainer}>
                  <Text style={[styles.pdfTitle, isDarkMode && styles.darkText]}>
                    {item.filename}
                  </Text>
                  <Text style={[styles.pdfSubject, isDarkMode && styles.darkSubText]}>{item.branch=="CSE" ? "Computer Science" : item.branch=="ME" ? "Mechanical Engineering" : item.branch=="CE" ? "Civil Engineering" : "Electrical Engineer"}</Text>
                  <Text style={[styles.pdfSubject, isDarkMode && styles.darkSubText]}>
                    {item.subject}
                  </Text>
                </View>
              </View>
              <View style={styles.pdfActions}>
                <TouchableOpacity
                  onPress={() => handleDownload(item.cloudinaryUrl+".pdf")}
                  style={styles.actionButton}
                >
                  <Download
                    size={20}
                    color={isDarkMode ? "#60A5FA" : "#3B82F6"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  available: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  refreshButton: {
    backgroundColor: "#4a6cf7",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "center",
    marginBottom: 10,
  },
  darkRefreshButton: {
    backgroundColor: "#1E3A8A",
  },
  availablePdfItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  },
  pdfSubject: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 2,
  },
  pdfActions: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
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
});

export default AvailablePDFItem;
