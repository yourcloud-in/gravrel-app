import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCloudStore } from '../store/cloudStore';
import { useAuthStore } from '../store/authStore';

export default function DashboardScreen({ navigation }: any) {
  const { datacenter, vms, fetchDatacenter, fetchVMs } = useCloudStore();
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDatacenter();
    fetchVMs();
    const t = setInterval(fetchDatacenter, 10000);
    return () => clearInterval(t);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchDatacenter(), fetchVMs()]);
    setRefreshing(false);
  };

  return (
    <LinearGradient colors={['#0A1628', '#0D2137']} style={s.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1D9E75" />}>
        <View style={s.header}>
          <View>
            <Text style={s.greeting}>Good day, {user?.name?.split(' ')[0] || 'Founder'} 👋</Text>
            <Text style={s.sub}>GravRel Cloud · Solar-powered ☀️</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Support')}>
            <Icon name="headset" size={28} color="#1D9E75" />
          </TouchableOpacity>
        </View>

        {/* Solar Stats */}
        <View style={s.solarCard}>
          <Text style={s.solarTitle}>☀️ Live Datacenter</Text>
          <View style={s.statsRow}>
            {[
              { label: 'Solar', value: `${datacenter?.solar_output_kw ?? '--'} kW` },
              { label: 'Battery', value: `${datacenter?.battery_percent ?? '--'}%` },
              { label: 'Nodes', value: `${datacenter?.nodes_online ?? '--'}` },
              { label: 'CO₂ Saved', value: `${datacenter?.co2_saved_kg ?? '0'}kg` },
            ].map((s2, i) => (
              <View key={i} style={s.statBox}>
                <Text style={s.statVal}>{s2.value}</Text>
                <Text style={s.statLabel}>{s2.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* VM Summary */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>My VMs ({vms.length})</Text>
          {vms.slice(0, 3).map((vm, i) => (
            <View key={i} style={s.vmRow}>
              <Icon name="server" size={18} color="#1D9E75" />
              <Text style={s.vmName}>{vm.name}</Text>
              <View style={[s.badge, { backgroundColor: vm.status === 'running' ? '#1D9E7520' : '#E6510020' }]}>
                <Text style={[s.badgeText, { color: vm.status === 'running' ? '#1D9E75' : '#E65100' }]}>{vm.status}</Text>
              </View>
            </View>
          ))}
          {vms.length === 0 && <Text style={s.empty}>No VMs yet. Create your first one!</Text>}
        </View>

        {/* Mission */}
        <View style={s.missionCard}>
          <Text style={s.missionText}>Zero carbon · Zero water waste · DPDP compliant · Solar-powered</Text>
          <Text style={s.missionSub}>gravrel.com · Bhubaneswar, Odisha</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 56 },
  greeting: { fontSize: 22, fontWeight: '800', color: '#fff' },
  sub: { fontSize: 13, color: '#4A6F8A', marginTop: 2 },
  solarCard: { margin: 16, backgroundColor: '#0D2137', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(29,158,117,0.2)', padding: 16 },
  solarTitle: { fontSize: 14, fontWeight: '700', color: '#1D9E75', marginBottom: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { alignItems: 'center' },
  statVal: { fontSize: 20, fontWeight: '800', color: '#1D9E75' },
  statLabel: { fontSize: 11, color: '#4A6F8A', marginTop: 2 },
  section: { marginHorizontal: 16, marginBottom: 16, backgroundColor: '#0D2137', borderRadius: 16, padding: 16 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#fff', marginBottom: 12 },
  vmRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  vmName: { flex: 1, fontSize: 14, color: '#fff' },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  empty: { color: '#4A6F8A', fontSize: 13, textAlign: 'center', paddingVertical: 12 },
  missionCard: { margin: 16, backgroundColor: '#0A1E14', borderRadius: 16, padding: 16, alignItems: 'center', marginBottom: 32 },
  missionText: { color: '#1D9E75', fontSize: 12, textAlign: 'center', fontWeight: '600' },
  missionSub: { color: '#2A4A3A', fontSize: 11, marginTop: 4 },
});
