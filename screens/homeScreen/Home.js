import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { FileText, Book, Clock } from "lucide-react-native";
import WelcomePopup from "./WelcomePopup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderAvailablePDFItem from "./RenderAvailableIPDFtem";
import { StoreContext } from "../../context/storeContext";

const COLORS = {
  lightBg: "#FAF9F6",
  darkBg: "#121212",
  cardLight: "#FFFFFF",
  cardDark: "#1E1E1E",
  accent1: "#240750",
  accent2: "#240750", 
  accent3: "#FFD93D",
  accent4: "#845EC2",
  accent5: "#2C73D2",
  textDark: "#F5F5F5",
  textLight: "#1F2937",
  subTextDark: "#A3A3A3",
  subTextLight: "#6B7280",
};

const Home = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const { isDarkMode, setIsDarkMode } = useContext(StoreContext);
  const colorScheme = useColorScheme();

  useEffect(() => {
    checkFirstVisit();
    setIsDarkMode(colorScheme === "dark");
  }, [colorScheme]);

  const checkFirstVisit = async () => {
    try {
      const hasVisited = await AsyncStorage.getItem("hasVisited");
      if (!hasVisited) {
        setIsFirstVisit(true);
        await AsyncStorage.setItem("hasVisited", "true");
      }
    } catch (error) {
      console.error("Error checking first visit:", error);
    }
  };

  const featuredPDFs = [
    { title: "Computer Science PYQs", type: "pyq" },
    { title: "Mechanical PYQs", type: "pyq" },
    { title: "Civil PYQs", type: "pyq" },
    { title: "Electrical PYQs", type: "pyq" },
  ];

  const availablePDFs = [
    { title: "M-1 PYQ 2022", type: "pyq", subject: "Mathematics 1" },
    { title: "M-2 PYQ 2022", type: "pyq", subject: "Mathematics 2" },
    { title: "M-1 PYQ 2021", type: "pyq", subject: "Mathematics 1" },
    { title: "M-2 PYQ 2021", type: "pyq", subject: "Mathematics 2" },
    { title: "Physics PYQ 2022", type: "pyq", subject: "Physics" },
    { title: "Chemistry PYQ 2022", type: "pyq", subject: "Chemistry" },
    { title: "DE Syllabus", type: "syllabus", subject: "Digital Electronics" },
    { title: "DBMS Syllabus", type: "syllabus", subject: "DataBase Management System" },
  ];

  const renderFeaturedPDFItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.featuredPdfItem,
        {
          backgroundColor: index % 2 === 0 ? COLORS.accent1 : COLORS.accent2,
        },
      ]}
    >
      <FileText size={24} color="#fff" />
      <Text style={[styles.featuredPdfTitle, { color: "#fff" }]}>{item.title}</Text>
      <Text style={[styles.featuredPdfType, { color: "#fefefe" }]}>
        {item.type === "syllabus" ? "Syllabus" : "PYQ"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? COLORS.darkBg : COLORS.lightBg }]}>
      {isFirstVisit && <WelcomePopup />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? COLORS.textDark : COLORS.textLight }]}>
            Featured PDFs
          </Text>
        </View>

        <View style={styles.featuredPdfGrid}>{featuredPDFs.map(renderFeaturedPDFItem)}</View>

        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Book size={24} color={isDarkMode ? COLORS.accent3 : COLORS.accent4} />
            <Text style={[styles.infoText, { color: isDarkMode ? COLORS.textDark : COLORS.textLight }]}>
              10+ Syllabi
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Clock size={24} color={isDarkMode ? COLORS.accent3 : COLORS.accent5} />
            <Text style={[styles.infoText, { color: isDarkMode ? COLORS.textDark : COLORS.textLight }]}>
              5 Years of PYQs
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: isDarkMode ? COLORS.textDark : COLORS.textLight }]}>
          All Available PDFs
        </Text>

        <View style={styles.availablePdfList}>
          {availablePDFs.map((item, index) => renderAvailablePDFItem(item, index, isDarkMode))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 22,
    fontWeight: "bold",
  },
  featuredPdfGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featuredPdfItem: {
    width: "48%",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    elevation: 4,
  },
  featuredPdfTitle: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 8,
  },
  featuredPdfType: {
    fontSize: 12,
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
    marginTop: 8,
  },
  availablePdfList: {
    marginTop: 15,
  },
});
