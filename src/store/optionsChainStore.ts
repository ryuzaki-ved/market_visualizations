import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { OptionsChainData } from '../types/optionsChain';

interface OptionsChainStore {
  indices: string[];
  expiries: string[];
  selectedIndex: string;
  selectedExpiry: string;
  selectedStrikes: string[];
  optionsData: OptionsChainData[];
  loading: boolean;
  error: string | null;
  setSelectedIndex: (index: string) => void;
  setSelectedExpiry: (expiry: string) => void;
  toggleStrike: (strike: string) => void;
  fetchOptionsData: () => Promise<void>;
  fetchIndices: () => Promise<void>;
  fetchExpiries: () => Promise<void>;
}

export const useOptionsChainStore = create<OptionsChainStore>((set, get) => ({
  indices: ['NIFTY', 'BANKNIFTY'],
  expiries: [],
  selectedIndex: '',
  selectedExpiry: '',
  selectedStrikes: [],
  optionsData: [],
  loading: false,
  error: null,

  setSelectedIndex: async (index) => {
    set({ selectedIndex: index, selectedExpiry: '', expiries: [] });
    await get().fetchExpiries();
  },

  setSelectedExpiry: async (expiry) => {
    set({ selectedExpiry: expiry });
    await get().fetchOptionsData();
  },

  toggleStrike: (strike) => {
    set((state) => ({
      selectedStrikes: state.selectedStrikes.includes(strike)
        ? state.selectedStrikes.filter(s => s !== strike)
        : [...state.selectedStrikes, strike]
    }));
  },

  fetchOptionsData: async () => {
    const { selectedIndex, selectedExpiry } = get();
    if (!selectedIndex || !selectedExpiry) return;

    set({ loading: true, error: null });

    try {
      const { data, error } = await supabase
        .from('options_chain')
        .select('*')
        .eq('index', selectedIndex)
        .eq('expiry', selectedExpiry);

      if (error) throw error;

      set({ optionsData: data || [], loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch options data', loading: false });
    }
  },

  fetchIndices: async () => {
    try {
      const { data, error } = await supabase
        .from('options_chain')
        .select('index')
        .distinct();

      if (error) throw error;

      set({ indices: data.map(d => d.index) });
    } catch (error) {
      set({ error: 'Failed to fetch indices' });
    }
  },

  fetchExpiries: async () => {
    const { selectedIndex } = get();
    if (!selectedIndex) return;

    try {
      const { data, error } = await supabase
        .from('options_chain')
        .select('expiry')
        .eq('index', selectedIndex)
        .distinct();

      if (error) throw error;

      set({ expiries: data.map(d => d.expiry) });
    } catch (error) {
      set({ error: 'Failed to fetch expiries' });
    }
  },
}));