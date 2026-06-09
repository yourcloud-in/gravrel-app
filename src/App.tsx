import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1628" />
      <Text style={styles.logo}>GravRel</Text>
      <Text style={styles.tagline}>India's First Solar-Powered Cloud</Text>
      <Text style={styles.sub}>Zero carbon · Zero water waste · DPDP</Text>
      <Text style={styles.location}>Bhubaneswar, Odisha</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A1628', alignItems: 'center', justifyContent: 'center', padding: 24 },
  logo: { fontSize: 56, fontWeight: '800', color: '#1D9E75', marginBottom: 16 },
  tagline: { fontSize: 18, color: '#ffffff', fontWeight: '600', textAlign: 'center', marginBottom: 16 },
  sub: { fontSize: 14, color: '#1D9E75', textAlign: 'center', marginBottom: 8 },
  location: { fontSize: 13, color: '#4A6F8A', textAlign: 'center' },
});
