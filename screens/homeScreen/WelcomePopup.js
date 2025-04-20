import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomePopup() {
  const [modalVisible, setModalVisible] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    // Combined animations for a more dynamic entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleClose = () => {
    // Fade-out animation before closing the modal
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 0.8,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 400,
        useNativeDriver: true,
      })
    ]).start();

    // Wait for the animation to complete before hiding the modal
    setTimeout(() => setModalVisible(false), 400);
  };

  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.popupCard, 
            { 
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim }
              ]
            }
          ]}
        >
          <LinearGradient
            colors={['#4C6FFF', '#6C63FF']}
            style={styles.gradientHeader}
          >
            <Text style={styles.popupTitle}>🎉 Welcome to ExamVault! 📚</Text>
          </LinearGradient>
          
          <View style={styles.contentContainer}>
            <Text style={styles.popupMessage}>
              Your one-stop destination for syllabus, question papers, and study materials. 
              Stay ahead in your academics with easy access to everything you need.
            </Text>
            
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteIcon}>❝</Text>
              <Text style={styles.quote}>
                "Success is not the key to happiness. Happiness is the key to success." – Albert Schweitzer
              </Text>
            </View>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#4C6FFF', '#6C63FF']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.closeButtonText}>Let's Get Started 🚀</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  popupCard: {
    width: width * 0.85,
    maxWidth: 380,
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradientHeader: {
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainer: {
    padding: 25,
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  popupMessage: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  quoteContainer: {
    backgroundColor: '#F5F7FF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  quoteIcon: {
    fontSize: 24,
    color: '#4C6FFF',
    marginRight: 10,
  },
  quote: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
    flex: 1,
  },
  closeButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
