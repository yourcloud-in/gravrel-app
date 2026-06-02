import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Linking, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SupportScreen() {
  const [message, setMessage] = useState('');

  const sendEmail = () => {
    Linking.openURL(`mailto:ceo@gravrel.com?subject=Support Request&body=${message}`);
  };

  return (
    <LinearGradient colors={['#0A1628', '#0D2137']} style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>Support</Text>
        <Text style={s.sub}>We're here to help</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <TouchableOpacity style={s.callCard} onPress={() => Linking.openURL('mailto:ceo@gravrel.com')}>
          <Icon name="email" size={28} color="#1D9E75" />
          <View style={{ flex: 1 }}>
            <Text style={s.callTitle}>Email Babrit directly</Text>
            <Text style={s.callSub}>ceo@gravrel.com · CEO personally responds</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#4A6F8A" />
        </TouchableOpacity>
        <View style={s.card}>
          <Text style={s.cardTitle}>Send a message</Text>
          <TextInput
            style={s.input}
            placeholder="Describe your issue..."
            placeholderTextColor="#4A6F8A"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity style={s.btn} onPress={sendEmail}>
            <Text style={s.btnText}>Send message →</Text>
          </TouchableOpacity>
        </View>
        <View style={s.infoCard}>
          <Text style={s.infoTitle}>Response time</Text>
          <Text style={s.infoText}>We respond to all support requests within 2 hours during business hours. For urgent issues, email ceo@gravrel.com directly.</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 56 },
  title: { fontSize: 24, fontWeight: '800', color: '#fff' },
  sub: { fontSize: 13, color: '#4A6F8A', marginTop: 4 },
  callCard: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#0A1E14', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(29,158,117,0.3)', padding: 18 },
  callTitle: { fontSize: 15, fontWeight: '700', color: '#fff' },
  callSub: { fontSize: 12, color: '#4A6F8A', marginTop: 2 },
  card: { backgroundColor: '#0D2137', borderRadius: 16, padding: 16, gap: 12 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#fff' },
  input: { backgroundColor: '#112233', borderRadius: 10, borderWidth: 1, borderColor: '#1A3A2A', padding: 14, color: '#fff', fontSize: 14, minHeight: 100, textAlignVertical: 'top' },
  btn: { backgroundColor: '#1D9E75', borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  infoCard: { backgroundColor: '#0D2137', borderRadius: 14, padding: 16, gap: 8 },
  infoTitle: { fontSize: 14, fontWeight: '700', color: '#fff' },
  infoText: { fontSize: 13, color: '#4A6F8A', lineHeight: 20 },
});
