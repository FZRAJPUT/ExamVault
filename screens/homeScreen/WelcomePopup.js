import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

export default function WelcomePopup() {
  const [modalVisible, setModalVisible] = useState(true);
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.popupCard, { opacity: fadeAnim }]}>
          <Text style={styles.popupTitle}>🎉 Welcome to EndSem! 📚</Text>
          <Text style={styles.popupMessage}>
            Your one-stop destination for syllabus, question papers, and study materials. 
            Stay ahead in your academics with easy access to everything you need.
          </Text>
          <Text style={styles.quote}>
            "Success is not the key to happiness. Happiness is the key to success." – Albert Schweitzer
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Let's Get Started 🚀</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupCard: {
    width: 320,
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    elevation: 5,
  },
  popupTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  popupMessage: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 15,
  },
  quote: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#4C6FFF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
