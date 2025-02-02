import { StyleSheet, Text, View, ScrollView, TouchableOpacity, useColorScheme } from "react-native"
import { useState, useEffect, useContext } from "react"
import { FileText, Book, Clock, Moon, Sun } from "lucide-react-native"
import TopBar from "../../components/TopBar"
import WelcomePopup from "./WelcomePopup"
import AsyncStorage from "@react-native-async-storage/async-storage"
import renderAvailablePDFItem from "./RenderAvailableIPDFtem"
import { StoreContext } from "../../context/storeContext"

const Home = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const { isDarkMode, setIsDarkMode } = useContext(StoreContext)
  const colorScheme = useColorScheme()

  useEffect(() => {
    checkFirstVisit()
    setIsDarkMode(colorScheme === "dark")
  }, [colorScheme]) // Added colorScheme to dependencies

  const checkFirstVisit = async () => {
    try {
      const hasVisited = await AsyncStorage.getItem("hasVisited")
      if (!hasVisited) {
        setIsFirstVisit(true)
        await AsyncStorage.setItem("hasVisited", "true")
      }
    } catch (error) {
      console.error("Error checking first visit:", error)
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const featuredPDFs = [
    { title: "Computer Science PYQs", type: "pyq" },
    { title: "Machanical PYQs", type: "pyq" },
    { title: "Civil PYQs", type: "pyq" },
    { title: "Electrical PYQs", type: "pyq" },
  ]

  const availablePDFs = [
    { title: "M-1 PYQ 2022", type: "pyq", subject: "Mathematics 1" },
    { title: "M-2 PYQ 2022", type: "pyq", subject: "Mathematics 2" },
    { title: "M-1 PYQ 2021", type: "pyq", subject: "Mathematics 1" },
    { title: "M-2 PYQ 2021", type: "pyq", subject: "Mathematics 2" },
    { title: "Physics PYQ 2022", type: "pyq", subject: "Physics" },
    { title: "Chemistry PYQ 2022", type: "pyq", subject: "Chemistry" },
    { title: "DE Syllabus", type: "syllabus", subject: "Digital Electronics" },
    { title: "DBMS Syllabus", type: "syllabus", subject: "DataBase Management System" },
  ]

  const renderFeaturedPDFItem = (item, index) => (
    <TouchableOpacity key={index} style={[styles.featuredPdfItem, isDarkMode && styles.darkItem]}>
      <FileText size={24} color={isDarkMode ? "#E5E7EB" : "#4B5563"} />
      <Text style={[styles.featuredPdfTitle, isDarkMode && styles.darkText]}>{item.title}</Text>
      <Text style={[styles.featuredPdfType, isDarkMode && styles.darkSubText]}>
        {item.type === "syllabus" ? "Syllabus" : "PYQ"}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <TopBar />
      {isFirstVisit && <WelcomePopup />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Featured PDFs</Text>
        </View>
        <View style={styles.featuredPdfGrid}>{featuredPDFs.map(renderFeaturedPDFItem)}</View>
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Book size={24} color={isDarkMode ? "#E5E7EB" : "#4B5563"} />
            <Text style={[styles.infoText, isDarkMode && styles.darkText]}>10+ Syllabi</Text>
          </View>
          <View style={styles.infoItem}>
            <Clock size={24} color={isDarkMode ? "#E5E7EB" : "#4B5563"} />
            <Text style={[styles.infoText, isDarkMode && styles.darkText]}>5 Years of PYQs</Text>
          </View>
        </View>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>All Available PDFs</Text>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View style={styles.availablePdfList}>
            {availablePDFs.map((item, index) => renderAvailablePDFItem(item, index, isDarkMode))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 80,
  },
  darkContainer: {
    backgroundColor: "#1F2937",
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  themeToggle: {
    padding: 8,
  },
  featuredPdfGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featuredPdfItem: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkItem: {
    backgroundColor: "#374151",
  },
  featuredPdfTitle: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
    color: "#374151",
  },
  featuredPdfType: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
    marginBottom: 24,
  },
  infoItem: {
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
    marginTop: 8,
  },
  availablePdfList: {
    marginTop:15
  },
  darkText: {
    color: "#E5E7EB",
  },
  darkSubText: {
    color: "#9CA3AF",
  },
})

