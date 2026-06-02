import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DPDPScreen() {
  const items = [
    { icon: 'shield-check', label: 'DPDP Act 2023', status: 'Compliant', ok: true },
    { icon: 'leaf', label: 'Green Certificate', status: 'Active', ok: true },
    { icon: 'solar-power', label: 'Solar Powered', status: '100%', ok: true },
    { icon: 'molecule-co2', label: 'Carbon Emissions', status: '0 kg CO2', ok: true },
    { icon: 'water-off', label: 'Water Usage', status: 'Zero waste', ok: true },
    { icon: 'certificate', label: 'BRSR Eligible', status: 'Yes', ok: true },
  ];

  return (
    <LinearGradient colors={['#0A1628', '#0D2137']} style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>DPDP & Green</Text>
        <Text style={s.sub}>Data Protection & Sustainability Status</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {items.map((item, i) => (
          <View key={i} style={s.row}>
            <View style={s.iconBox}>
              <Icon name={item.icon} size={22} color="#1D9E75" />
            </View>
            <Text style={s.label}>{item.label}</Text>
            <View style={s.badge}>
              <Text style={s.badgeText}>{item.status}</Text>
            </View>
          </View>
        ))}
        <View style={s.certCard}>
          <Text style={s.certTitle}>☀️ GravRel Green Certificate</Text>
          <Text style={s.certText}>Your infrastructure is certified 100% solar powered and DPDP Act 2023 compliant. Valid for BRSR and ESG reporting.</Text>
          <Text style={s.certSub}>Issued by GravRel · gravrel.com · UDYAM-OD-03-0020346</Text>
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
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0D2137', borderRadius: 14, padding: 16, gap: 12 },
  iconBox: { width: 40, height: 40, backgroundColor: '#0A1E14', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  label: { flex: 1, fontSize: 14, fontWeight: '600', color: '#fff' },
  badge: { backgroundColor: '#1D9E7520', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 12, color: '#1D9E75', fontWeight: '700' },
  certCard: { backgroundColor: '#0A1E14', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(29,158,117,0.3)', padding: 20, gap: 8 },
  certTitle: { fontSize: 16, fontWeight: '700', color: '#1D9E75' },
  certText: { fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 20 },
  certSub: { fontSize: 11, color: '#2A4A3A' },
});
