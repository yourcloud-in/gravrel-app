import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null, user: null, isLoading: false,
  loadToken: async () => {
    const token = await AsyncStorage.getItem('gravrel_token');
    if (token) set({ token });
  },
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await api.post('/auth/login', { email, password });
      await AsyncStorage.setItem('gravrel_token', res.data.token);
      set({ token: res.data.token, user: res.data.user, isLoading: false });
    } catch (e) { set({ isLoading: false }); throw e; }
  },
  register: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const res = await api.post('/auth/register', { name, email, password });
      await AsyncStorage.setItem('gravrel_token', res.data.token);
      set({ token: res.data.token, user: res.data.user, isLoading: false });
    } catch (e) { set({ isLoading: false }); throw e; }
  },
  logout: async () => {
    await AsyncStorage.removeItem('gravrel_token');
    set({ token: null, user: null });
  },
}));
