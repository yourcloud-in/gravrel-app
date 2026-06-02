import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api';

export default function BillingScreen() {
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    api.get('/billing/invoices').then(r => setInvoices(r.data)).catch(() => {});
  }, []);

  return (
    <LinearGradient colors={['#0A1628', '#0D2137']} style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>Billing</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <View style={s.card}>
          <Text style={s.cardLabel}>Current Plan</Text>
          <Text style={s.cardValue}>Cloud VM Starter</Text>
          <Text style={s.cardSub}>Rs 199/mo + 18% GST</Text>
        </View>
        <Text style={s.sectionTitle}>Invoices</Text>
        {invoices.length === 0 ? (
          <View style={s.empty}>
            <Icon name="receipt" size={40} color="#1A3A2A" />
            <Text style={s.emptyText}>No invoices yet</Text>
          </View>
        ) : invoices.map((inv, i) => (
          <View key={i} style={s.invoiceRow}>
            <View>
              <Text style={s.invNumber}>{inv.receipt_number}</Text>
              <Text style={s.invDate}>{inv.date}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={s.invAmount}>Rs {inv.amounts?.total_amount}</Text>
              <Text style={s.invStatus}>Paid</Text>
            </View>
          </View>
        ))}
        <View style={s.greenCard}>
          <Icon name="leaf" size={20} color="#1D9E75" />
          <Text style={s.greenText}>Your infrastructure runs on 100% solar energy. Zero CO2 emissions.</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 56 },
  title: { fontSize: 24, fontWeight: '800', color: '#fff' },
  card: { backgroundColor: '#0D2137', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(29,158,117,0.2)', padding: 20 },
  cardLabel: { fontSize: 12, color: '#4A6F8A', marginBottom: 4 },
  cardValue: { fontSize: 20, fontWeight: '700', color: '#fff' },
  cardSub: { fontSize: 13, color: '#1D9E75', marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#fff', marginTop: 8 },
  invoiceRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#0D2137', borderRadius: 12, padding: 16 },
  invNumber: { fontSize: 13, color: '#fff', fontWeight: '600' },
  invDate: { fontSize: 12, color: '#4A6F8A' },
  invAmount: { fontSize: 15, fontWeight: '700', color: '#1D9E75' },
  invStatus: { fontSize: 11, color: '#1D9E75' },
  empty: { alignItems: 'center', paddingVertical: 32, gap: 8 },
  emptyText: { color: '#4A6F8A', fontSize: 14 },
  greenCard: { flexDirection: 'row', gap: 10, backgroundColor: '#0A1E14', borderRadius: 12, padding: 16, alignItems: 'center' },
  greenText: { flex: 1, fontSize: 12, color: '#4A6F8A', lineHeight: 18 },
});
