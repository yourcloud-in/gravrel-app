import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const check = async () => {
      const token = await AsyncStorage.getItem('gravrel_token');
      setTimeout(() => {
        navigation.replace(token ? 'Main' : 'Login');
      }, 2000);
    };
    check();
  }, []);

  return (
    <LinearGradient colors={['#0A1628', '#0D2137']} style={s.container}>
      <Text style={s.logo}>GravRel</Text>
      <Text style={s.tagline}>India's First Solar-Powered Cloud</Text>
      <ActivityIndicator color="#1D9E75" style={{ marginTop: 40 }} />
      <Text style={s.mission}>Zero carbon · Zero water waste · Solar-powered ☀️</Text>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 48, fontWeight: '800', color: '#1D9E75', letterSpacing: -1 },
  tagline: { fontSize: 16, color: 'rgba(255,255,255,0.6)', marginTop: 8 },
  mission: { position: 'absolute', bottom: 32, fontSize: 12, color: '#1D9E75' },
});
