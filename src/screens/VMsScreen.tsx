import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCloudStore } from '../store/cloudStore';

export default function VMsScreen({ navigation }: any) {
  const { vms, fetchVMs, isLoading } = useCloudStore();

  useEffect(() => { fetchVMs(); }, []);

  return (
    <LinearGradient colors={['#0A1628', '#0D2137']} style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>My VMs</Text>
        <TouchableOpacity style={s.addBtn}>
          <Icon name="plus" size={20} color="#fff" />
          <Text style={s.addText}>New VM</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={vms}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchVMs} tintColor="#1D9E75" />}
        renderItem={({ item }) => (
          <View style={s.vmCard}>
            <View style={s.vmTop}>
              <Icon name="server" size={22} color="#1D9E75" />
              <Text style={s.vmName}>{item.name}</Text>
              <View style={[s.badge, { backgroundColor: item.status === 'running' ? '#1D9E7520' : '#E6510020' }]}>
                <Text style={[s.badgeText, { color: item.status === 'running' ? '#1D9E75' : '#E65100' }]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <View style={s.vmStats}>
              <Text style={s.stat}>{item.cpu} vCPU</Text>
              <Text style={s.stat}>{item.ram}GB RAM</Text>
              <Text style={s.stat}>{item.storage}GB SSD</Text>
              <Text style={s.stat}>{item.ip}</Text>
            </View>
            <View style={s.vmActions}>
              <TouchableOpacity style={s.actionBtn}>
                <Icon name="play" size={16} color="#1D9E75" />
                <Text style={s.actionText}>Start</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.actionBtn}>
                <Icon name="stop" size={16} color="#E65100" />
                <Text style={[s.actionText, { color: '#E65100' }]}>Stop</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.actionBtn}>
                <Icon name="console" size={16} color="#4A6F8A" />
                <Text style={[s.actionText, { color: '#4A6F8A' }]}>Console</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={s.empty}>
            <Icon name="server-off" size={48} color="#1A3A2A" />
            <Text style={s.emptyText}>No VMs yet</Text>
            <Text style={s.emptySub}>Create your first cloud VM</Text>
          </View>
        }
      />
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 56 },
  title: { fontSize: 24, fontWeight: '800', color: '#fff' },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#1D9E75', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8 },
  addText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  vmCard: { backgroundColor: '#0D2137', borderRadius: 16, borderWidth: 1, borderColor: '#1A3A2A', padding: 16 },
  vmTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  vmName: { flex: 1, fontSize: 16, fontWeight: '700', color: '#fff' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  vmStats: { flexDirection: 'row', gap: 12, marginBottom: 14, flexWrap: 'wrap' },
  stat: { fontSize: 12, color: '#4A6F8A', backgroundColor: '#112233', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  vmActions: { flexDirection: 'row', gap: 12 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionText: { fontSize: 13, color: '#1D9E75', fontWeight: '600' },
  empty: { alignItems: 'center', paddingTop: 80, gap: 12 },
  emptyText: { fontSize: 18, fontWeight: '700', color: '#fff' },
  emptySub: { fontSize: 14, color: '#4A6F8A' },
});
