import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { FileText } from "lucide-react-native";
import WelcomePopup from "./WelcomePopup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoreContext } from "../../context/storeContext";
import AvailablePDFItem from "./RenderAvailableIPDFtem";

const COLORS = {
  lightBg: "#FAF9F6",
  darkBg: "#121212",
  cardLight: "#FFFFFF",
  cardDark: "#1E1E1E",
  accent1: "#4a6cf7",
  accent2: "#4a6cf7",
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

  const renderFeaturedPDFItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={[styles.featuredPdfItem, {
        backgroundColor: index % 2 === 0 ? COLORS.accent1 : COLORS.accent2,
      }]}
    >
      <FileText size={24} color="#fff" />
      <Text style={[styles.featuredPdfTitle, { color: "#fff" }]}>
        {item.title}
      </Text>
      <Text style={[styles.featuredPdfType, { color: "#fefefe" }]}>
        {item.type === "syllabus" ? "Syllabus" : "PYQ"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: isDarkMode ? COLORS.darkBg : COLORS.lightBg }]}
    >
      {isFirstVisit && <WelcomePopup />}
        <View style={styles.header}>
          <Text
            style={[styles.sectionTitle, { color: isDarkMode ? COLORS.textDark : COLORS.textLight }]}
          >
            ExamVault
          </Text>
        </View>
        {/* <View style={styles.featuredPdfGrid}>
          {featuredPDFs.map(renderFeaturedPDFItem)}
        </View> */}

        {/* <Text
          style={[styles.sectionTitle, { color: isDarkMode ? COLORS.textDark : COLORS.textLight }]}
        >
          All Available PDFs
        </Text> */}
        <AvailablePDFItem />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    width: "45%", // Reduce width for smaller cards
    borderRadius: 10, // Slightly smaller corners
    padding: 10, // Reduced padding
    marginBottom: 12, // Reduced margin for compactness
    alignItems: "center",
    elevation: 3, // Slight shadow
  },
  featuredPdfTitle: {
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 6, // Reduced margin
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
