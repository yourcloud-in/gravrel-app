import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuthStore } from '../store/authStore';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) { Alert.alert('Error', 'Please fill all fields'); return; }
    try {
      await login(email, password);
      navigation.replace('Main');
    } catch {
      Alert.alert('Login failed', 'Check your email and password');
    }
  };

  return (
    <LinearGradient colors={['#0A1628', '#0D2137']} style={s.container}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.logo}>GravRel</Text>
        <Text style={s.title}>Welcome back</Text>
        <Text style={s.sub}>India's first solar-powered cloud</Text>

        <TextInput style={s.input} placeholder="Email" placeholderTextColor="#4A6F8A"
          value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={s.input} placeholder="Password" placeholderTextColor="#4A6F8A"
          value={password} onChangeText={setPassword} secureTextEntry />

        <TouchableOpacity style={s.btn} onPress={handleLogin} disabled={isLoading}>
          <Text style={s.btnText}>{isLoading ? 'Logging in...' : 'Login →'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={s.link}>Don't have an account? <Text style={{ color: '#1D9E75' }}>Sign up</Text></Text>
        </TouchableOpacity>

        <Text style={s.mission}>Zero carbon · Solar-powered ☀️</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  logo: { fontSize: 36, fontWeight: '800', color: '#1D9E75', textAlign: 'center', marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', color: '#fff', textAlign: 'center' },
  sub: { fontSize: 14, color: '#4A6F8A', textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: '#112233', borderRadius: 12, borderWidth: 1, borderColor: '#1A3A2A',
    paddingHorizontal: 16, paddingVertical: 14, color: '#fff', fontSize: 15, marginBottom: 16 },
  btn: { backgroundColor: '#1D9E75', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginBottom: 20 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  link: { color: '#4A6F8A', textAlign: 'center', fontSize: 14, marginBottom: 40 },
  mission: { color: '#1D9E75', textAlign: 'center', fontSize: 11 },
});
