import { create } from 'zustand';
import api from '../services/api';

interface VM {
  id: string; name: string; status: string;
  plan: string; ip: string; cpu: number; ram: number; storage: number;
}
interface DatacenterStats {
  solar_output_kw: number; battery_percent: number;
  nodes_online: number; co2_saved_kg: number;
}
interface CloudState {
  vms: VM[]; datacenter: DatacenterStats | null; isLoading: boolean;
  fetchVMs: () => Promise<void>;
  fetchDatacenter: () => Promise<void>;
  createVM: (data: any) => Promise<void>;
}

export const useCloudStore = create<CloudState>((set) => ({
  vms: [], datacenter: null, isLoading: false,
  fetchVMs: async () => {
    set({ isLoading: true });
    try { const r = await api.get('/vms'); set({ vms: r.data, isLoading: false }); }
    catch { set({ isLoading: false }); }
  },
  fetchDatacenter: async () => {
    try { const r = await api.get('/datacenter'); set({ datacenter: r.data }); } catch {}
  },
  createVM: async (data) => {
    set({ isLoading: true });
    try {
      await api.post('/vms', data);
      const r = await api.get('/vms');
      set({ vms: r.data, isLoading: false });
    } catch { set({ isLoading: false }); throw new Error('Failed'); }
  },
}));
