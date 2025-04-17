import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StoreContext } from '../../context/storeContext';
import { Book, FileText, Users, Star, ExternalLink } from 'lucide-react-native';

const About = () => {
  const { isDarkMode } = useContext(StoreContext);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const FeatureCard = ({ icon, title, description }) => (
    <View style={[styles.featureCard, { backgroundColor: theme.cardBackgroundColor }]}>
      <View style={[styles.iconContainer, { backgroundColor: theme.iconBackgroundColor }]}>
        {icon}
      </View>
      <Text style={[styles.featureTitle, { color: theme.textColor }]}>{title}</Text>
      <Text style={[styles.featureDescription, { color: theme.textSecondaryColor }]}>{description}</Text>
    </View>
  );

  const TeamMember = ({ image, name, role }) => (
    <View style={styles.teamMember}>
      <Image source={{ uri: image }} style={styles.teamMemberImage} />
      <Text style={[styles.teamMemberName, { color: theme.textColor }]}>{name}</Text>
      <Text style={[styles.teamMemberRole, { color: theme.textSecondaryColor }]}>{role}</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.appName, { color: theme.textColor }]}>ExamVault</Text>
        <Text style={[styles.appDescription, { color: theme.textSecondaryColor }]}>
          Your one-stop solution for all academic syllabi and previous year questions
        </Text>
      </View>

      <View style={styles.featuresContainer}>
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Key Features</Text>
        <View style={styles.featuresGrid}>
          <FeatureCard
            icon={<Book size={24} color={theme.iconColor} />}
            title="Comprehensive Syllabi"
            description="Access syllabi for various courses and universities"
          />
          <FeatureCard
            icon={<FileText size={24} color={theme.iconColor} />}
            title="Previous Year Questions"
            description="Practice with a vast collection of past exam papers"
          />
          <FeatureCard
            icon={<Users size={24} color={theme.iconColor} />}
            title="Community Driven"
            description="Contribute and benefit from peer-to-peer knowledge sharing"
          />
          <FeatureCard
            icon={<Star size={24} color={theme.iconColor} />}
            title="Personalized Experience"
            description="Tailor the app to your specific academic needs"
          />
        </View>
      </View>

      <View style={styles.teamContainer}>
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Meet Our Team</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.teamScroll}>
          <TeamMember
            image="https://randomuser.me/api/portraits/women/44.jpg"
            name="Sarah Johnson"
            role="Founder & CEO"
          />
          <TeamMember
            image="https://randomuser.me/api/portraits/men/32.jpg"
            name="Michael Chen"
            role="Lead Developer"
          />
          <TeamMember
            image="https://randomuser.me/api/portraits/women/68.jpg"
            name="Emily Rodriguez"
            role="UX Designer"
          />
          <TeamMember
            image="https://randomuser.me/api/portraits/men/75.jpg"
            name="David Kim"
            role="Content Manager"
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical:25
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  appDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    paddingVertical: 40,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  featureCard: {
    width: '45%',
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    paddingVertical:10
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  teamContainer: {
    paddingVertical: 40,
  },
  teamScroll: {
    paddingHorizontal: 20,
  },
  teamMember: {
    alignItems: 'center',
    marginRight: 30,
  },
  teamMemberImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  teamMemberName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  teamMemberRole: {
    fontSize: 14,
  },
  ctaContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  ctaText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
  ctaButtonIcon: {
    marginLeft: 5,
  },
});

const lightTheme = {
  backgroundColor: '#F8FAFC',
  textColor: '#1F2937',
  textSecondaryColor: '#6B7280',
  cardBackgroundColor: '#FFFFFF',
  iconBackgroundColor: '#E0F2FE',
  iconColor: '#0EA5E9',
  buttonBackgroundColor: '#0EA5E9',
  buttonTextColor: '#FFFFFF',
};

const darkTheme = {
  backgroundColor: '#1F2937',
  textColor: '#F9FAFB',
  textSecondaryColor: '#D1D5DB',
  cardBackgroundColor: '#374151',
  iconBackgroundColor: '#0F172A',
  iconColor: '#38BDF8',
  buttonBackgroundColor: '#38BDF8',
  buttonTextColor: '#1F2937',
};

export default About;