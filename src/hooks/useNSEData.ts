import { useState, useEffect } from 'react';
import { NSEDataResponse } from '../types/nse';
import { fetchNSEData } from '../services/nseApi';

interface UseNSEDataProps {
  reportId: string;
  startDate: string;
  endDate: string;
}

interface UseNSEDataReturn {
  data: NSEDataResponse['data'] | null;
  loading: boolean;
  error: string | null;
}

export const useNSEData = ({ reportId, startDate, endDate }: UseNSEDataProps): UseNSEDataReturn => {
  const [data, setData] = useState<NSEDataResponse['data'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!reportId || !startDate || !endDate) return;

      setLoading(true);
      setError(null);
      
      try {
        const response = await fetchNSEData({ reportId, startDate, endDate });
        if (response.error) {
          setError(response.error);
          setData(null);
        } else {
          setData(response.data);
        }
      } catch (err) {
        setError('Failed to fetch data');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reportId, startDate, endDate]);

  return { data, loading, error };
};