import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { FileText, Download, Eye } from "lucide-react-native"

const renderAvailablePDFItem = (item, index, isDarkMode) => {
  const handleDownload = () => {
    // Implement download functionality
    console.log(`Downloading ${item.title}`)
  }

  const handleView = () => {
    // Implement view functionality
    console.log(`Viewing ${item.title}`)
  }

  return (
    <View key={index} style={[styles.availablePdfItem, isDarkMode && styles.darkItem]}>
      <View style={styles.pdfInfo}>
        <FileText size={24} color={isDarkMode ? "#E5E7EB" : "#4B5563"} />
        <View style={styles.pdfTextContainer}>
          <Text style={[styles.pdfTitle, isDarkMode && styles.darkText]}>{item.title}</Text>
          <Text style={[styles.pdfSubject, isDarkMode && styles.darkSubText]}>{item.subject}</Text>
        </View>
      </View>
      <View style={styles.pdfActions}>
        <TouchableOpacity onPress={handleDownload} style={styles.actionButton}>
          <Download size={20} color={isDarkMode ? "#60A5FA" : "#3B82F6"} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  availablePdfItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
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
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  pdfSubject: {
    fontSize: 14,
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
})

export default renderAvailablePDFItem