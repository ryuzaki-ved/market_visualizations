import axios from 'axios';
import { NSEDataResponse, NSERequestParams } from '../types/nse';
import { safeJSONParse } from '../utils/json';

const API_BASE_URL = 'http://localhost:3001/api';

export const fetchNSEData = async (params: NSERequestParams): Promise<NSEDataResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/nse-data`, params);
    const parsedData = safeJSONParse(response.data.data);
    
    if (!Array.isArray(parsedData)) {
      throw new Error('Invalid data format received');
    }
    
    return { data: parsedData };
  } catch (error) {
    console.error('Error fetching NSE data:', error);
    return { 
      data: [], 
      error: error instanceof Error ? error.message : 'An error occurred while fetching data' 
    };
  }
};