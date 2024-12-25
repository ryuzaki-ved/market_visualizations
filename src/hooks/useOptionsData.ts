import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useOptionsStore } from '../store/optionsStore';
import { normalizeData } from '../utils/dataTransforms';

interface FetchState {
  loading: boolean;
  error: string | null;
}

export function useOptionsData() {
  const { 
    mode, 
    dataType, 
    selectedStrikes, 
    normalized, 
    dateRange,
    setData 
  } = useOptionsStore();

  const [fetchState, setFetchState] = useState<FetchState>({
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!selectedStrikes.length) {
      setData([]);
      return;
    }

    if (mode === 'realtime') {
      const channel = supabase
        .channel('options-data')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: `${dataType}_data`,
          },
          (payload) => {
            const newData = normalized ? normalizeData([payload.new]) : [payload.new];
            setData((current) => [...current, ...newData]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      const fetchHistoricalData = async () => {
        setFetchState({ loading: true, error: null });
        try {
          // Create array of tickers based on selected strikes
          const tickers = selectedStrikes.map(strike => `DEMO${strike}`);

          const { data: historicalData, error } = await supabase
            .from(`${dataType}_data`)
            .select('*')
            .in('ticker', tickers)
            .gte('timestamp', dateRange.from)
            .lte('timestamp', dateRange.to)
            .order('timestamp', { ascending: true });

          if (error) {
            console.error('Fetch error:', error);
            setFetchState({ loading: false, error: error.message });
            return;
          }

          if (!historicalData?.length) {
            console.log('No data found for:', { tickers, dateRange });
            setFetchState({ 
              loading: false, 
              error: 'No data found for the selected criteria' 
            });
            setData([]);
            return;
          }

          const processedData = normalized ? normalizeData(historicalData) : historicalData;
          setData(processedData);
          setFetchState({ loading: false, error: null });
        } catch (error) {
          console.error('Unexpected error:', error);
          setFetchState({ 
            loading: false, 
            error: 'An unexpected error occurred while fetching data' 
          });
        }
      };

      fetchHistoricalData();
    }
  }, [mode, dataType, selectedStrikes, normalized, dateRange]);

  return fetchState;
}