import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { StoreContext } from '../../context/storeContext';
import { User, Mail, GraduationCap, MapPin} from 'lucide-react-native';

const Profile = () => {
  const { isDarkMode } = useContext(StoreContext);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const ProfileItem = ({ icon, text }) => (
    <View style={[styles.profileItem, { borderBottomColor: theme.borderColor }]}>
      {icon}
      <Text style={[styles.profileItemText, { color: theme.textColor }]}>{text}</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          style={styles.profileImage}
        />
        <Text style={[styles.name, { color: theme.textColor }]}>John Doe</Text>
        <Text style={[styles.bio, { color: theme.textSecondaryColor }]}>Computer Science Student</Text>
      </View>

      <View style={styles.profileInfo}>
        <ProfileItem icon={<User size={20} color={theme.iconColor} />} text="John Doe" />
        <ProfileItem icon={<Mail size={20} color={theme.iconColor} />} text="john.doe@example.com" />
        <ProfileItem icon={<GraduationCap size={20} color={theme.iconColor} />} text="Computer Science and Engineering" />
        <ProfileItem icon={<MapPin size={20} color={theme.iconColor} />} text="San Francisco, CA" />
      </View>
    </ScrollView>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  profileInfo: {
    paddingHorizontal: 20,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  profileItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

const lightTheme = {
  backgroundColor: '#F8FAFC',
  textColor: '#1F2937',
  textSecondaryColor: '#6B7280',
  borderColor: '#E5E7EB',
  iconColor: '#4B5563',
};

const darkTheme = {
  backgroundColor: '#1F2937',
  textColor: '#F9FAFB',
  textSecondaryColor: '#D1D5DB',
  borderColor: '#374151',
  iconColor: '#9CA3AF',
};
