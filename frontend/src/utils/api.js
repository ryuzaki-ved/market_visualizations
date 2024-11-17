import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const fetchMinuteData = async (params) => {
    const response = await axios.get(`${API_URL}/minute-data`, { params });
    return response.data;
};

export const fetchTickData = async (params) => {
    const response = await axios.get(`${API_URL}/tick-data`, { params });
    return response.data;
};
