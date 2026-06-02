import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthStore } from '../store/authStore';

export default function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: async () => {
        await logout();
        navigation.replace('Login');
      }}
    ]);
  };

  const menuItems = [
    { icon: 'account-edit', label: 'Edit Profile' },
    { icon: 'key-variant', label: 'API Keys' },
    { icon: 'bell-outline', label: 'Notifications' },
    { icon: 'shield-check-outline', label: 'DPDP Settings' },
    { icon: 'help-circle-outline', label: 'Help & Support' },
  ];

  return (
    <LinearGradient colors={['#0A1628', '#0D2137']} style={s.container}>
      <ScrollView>
        <View style={s.header}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>{user?.name?.charAt(0) || 'G'}</Text>
          </View>
          <Text style={s.name}>{user?.name || 'GravRel User'}</Text>
          <Text style={s.email}>{user?.email || ''}</Text>
          <View style={s.planBadge}>
            <Text style={s.planText}>{user?.plan || 'Free'}</Text>
          </View>
        </View>
        <View style={s.menu}>
          {menuItems.map((item, i) => (
            <TouchableOpacity key={i} style={s.menuItem}>
              <Icon name={item.icon} size={22} color="#1D9E75" />
              <Text style={s.menuLabel}>{item.label}</Text>
              <Icon name="chevron-right" size={18} color="#4A6F8A" />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
          <Icon name="logout" size={18} color="#E65100" />
          <Text style={s.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={s.footer}>GravRel · gravrel.com · UDYAM-OD-03-0020346{"\n"}Zero carbon · Solar-powered ☀️</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', padding: 32, paddingTop: 56 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1D9E75', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { fontSize: 32, fontWeight: '800', color: '#fff' },
  name: { fontSize: 22, fontWeight: '800', color: '#fff' },
  email: { fontSize: 14, color: '#4A6F8A', marginTop: 4 },
  planBadge: { marginTop: 10, backgroundColor: '#1D9E7520', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6 },
  planText: { color: '#1D9E75', fontSize: 13, fontWeight: '700' },
  menu: { marginHorizontal: 16, backgroundColor: '#0D2137', borderRadius: 16, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 18, borderBottomWidth: 1, borderBottomColor: '#1A3A2A' },
  menuLabel: { flex: 1, fontSize: 15, color: '#fff' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, margin: 16, backgroundColor: '#1A1A2E', borderRadius: 12, padding: 16 },
  logoutText: { fontSize: 15, fontWeight: '700', color: '#E65100' },
  footer: { textAlign: 'center', color: '#2A4A3A', fontSize: 11, marginBottom: 32, lineHeight: 18 },
});
